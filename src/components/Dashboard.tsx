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
		<tr key={key}>
			<td>
				<b>{d.name}</b>
			</td>
			<td>
				<p>{date.getMonth() + 1}/{date.getDay()} {time(date.getHours())}:{time(date.getMinutes())}</p>
			</td>
			<td>
				<p>{d.buy ? "-" : "+"}{d.price}</p>
			</td>
			<td>
				<p>{d.memo}</p>
			</td>
		</tr>
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
			<table className="balset">
				<tr>
					<td>Name</td>
					<td>Date</td>
					<td>Price</td>
					<td>Memo</td>
				</tr>
				{data.map((d: any, n) => <Item d={d} key={n}/>)}
			</table>
		</main>
	);
}
