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
			<nav className="navbar">
				<h2>Balance Client</h2>	
				<div className="action_row">
					<h4>Logged in from {url}</h4>
					<h3 onClick={ev => {
						ev.preventDefault();
						window.location.reload();
					}} className="icon">
						<i className="bi-arrow-clockwise" />
					</h3>

					<button onClick={ev => {
						ev.preventDefault();
						logout();
					}}>Logout</button>
				</div>
			</nav>
			<div className="bal_view">
				<InputModal url={url!} token={token!} />
				{data.map((d: any, n: number) => {
					return <BItem
						d={d}
						n={n}
						url={url!}
						key={n}
					/>
				})}
			</div>
		</main>
	);
}
