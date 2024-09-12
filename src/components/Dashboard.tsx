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
				<p>{date.getMonth() + 1}/{date.getDay()}/{date.getFullYear()} {time(date.getHours())}:{time(date.getMinutes())}</p>
			</td>
			<Earned buy={d.buy} />
			<td>
				<p>{d.price}</p>
			</td>
			<td>
				<p>{d.memo}</p>
			</td>
		</tr>
	);
}

function Earned({ buy }: { buy: boolean }) {
	const earned = (
		<td className="buy_earned">Earned</td>
	);

	const spend = (
		<td className="buy_spend">Spend</td>
	);
	
	return buy ? spend : earned;
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
					<div className="input_box">
						<div className="input_row heap_box">
							<span>Name</span>
							<input name="name" type="text" required />
							<span>Date</span>
							<input name="date" type="date" />
							<span>Price</span>
							<input name="price" type="number" />
						</div>
					</div>
					<div className="input_box">
						<div className="input_row">
							<div className="radio">
								<input name="buy" type="radio" value={0} />
								<span>Earned</span>
							</div>
							<div className="radio">
								<input name="buy" type="radio" value={1} />
								<span>Spend</span>
							</div>
						</div>
					</div>
					<div>
						<p>Memo</p>
						<div className="input_memo" contentEditable={true}></div>
					</div>
					<button>Create</button>
				</form>
				<table border={0} className="balset">
					<tr>
						<td>Name</td>
						<td>Date</td>
						<td>Type</td>
						<td>Price</td>
						<td>Memo</td>
					</tr>
					{data.map((d: any, n) => <Item d={d} key={n}/>)}
				</table>
			</div>
		</main>
	);
}
