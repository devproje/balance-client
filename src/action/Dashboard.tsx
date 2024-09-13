import { BItem } from "../components/BItem";
import { useEffect, useState } from "react";
import { InputModal } from "../components/InputModal";

function logout() {
	localStorage.removeItem("token");
	window.location.reload();
}

function ping(url: string) {
	const resp = fetch(url).then(res => {
		if (res.status !== 200) {
			return false;
		}

		return true;
	});

	return resp;
}

export function Dashboard({ url, token }: { url: string | null, token: string | null }) {
	const [data, setData] = useState([]);
	const [memo, setMemo] = useState(false);
	const [cur, setCur] = useState(0);
	
	useEffect(() => {
		if (url === null || token === null) {
			logout();
			return;
		}

		ping(url).then(res => {
			if (res) {
				return;
			}

			logout();
		});
		
		fetch(`${url}/balance`, {
			"method": "GET",
			"mode": "cors",
			"headers": {
				"Authorization": token
			}
		}).then(res => {
			if (res.status !== 200) {
				return;
			}

			return res.json();
		}).then(json => {
			setData(json.data);
		});
	});
	
	return (
		<main className="">
			<nav>test</nav>
			<button onClick={ev => {
				ev.preventDefault();
				logout();
			}}>Logout</button>
			<div className="bal_view">
				<InputModal url={url!} token={token!} />
				{data.map((d: any, n: number) => {
					return <BItem
						d={d}
						n={n}
						memo={memo}
						setMemo={setMemo}
						cur={cur}
						setCur={setCur}
						key={n}
					/>
				})}
			</div>
		</main>
	);
}
