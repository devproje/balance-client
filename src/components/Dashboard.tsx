import { useEffect, useState } from "react";

function logout() {
	localStorage.removeItem("token");
	window.location.reload();
}

function Item({ d, key }: { d: any, key: number }) {
	console.log(d);
	const date = new Date(d.date);
	function time(n: number) {
		if (n < 10) {
			return `0${n}`;
		}

		return n;
	}

	return (
		<div key={key}>
			<p>id: {d.id}</p>
			<p>name: {d.name}</p>
			<p>price: {d.buy ? "-" : "+"}{d.price}</p>
			<p>time: {time(date.getHours())}:{time(date.getMinutes())}</p>
			<p>=====================</p>
		</div>
	);
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
			<button onClick={ev => {
				ev.preventDefault();
				logout();
			}}>Logout</button>
			{data.map((d: any, n) => <Item d={d} key={n}/>)}
		</main>
	);
}
