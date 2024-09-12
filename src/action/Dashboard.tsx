import { BItem } from "../components/BItem";
import { useEffect, useState } from "react";

function logout() {
	localStorage.removeItem("token");
	window.location.reload();
}

export function Dashboard({ url, token }: { url: string | null, token: string | null }) {
	const [data, setData] = useState([]);
	
	useEffect(() => {
		if (url === null || token === null) {
			logout();
			return;
		}
		
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
				<form className="bal_add" onSubmit={ev => {
					ev.preventDefault();
				}}>
				</form>

				{data.map((d: any, n) => <BItem d={d} key={n} />)}
			</div>
		</main>
	);
}
