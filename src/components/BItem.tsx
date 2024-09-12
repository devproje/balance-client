export function BItem({ d, key }: { d: any, key: number }) {
	const date = new Date(d.date);
	function time(n: number) {
		if (n < 10) {
			return `0${n}`;
		}

		return n;
	}

	let dateStr = `${date.getFullYear()}-${time(date.getMonth() + 1)}-${time(date.getDay())} ${dayParser(date.getDay())} `;
	dateStr += `${time(date.getHours())}:${time(date.getMinutes())}`;

	return (
		<a className="bal_item" key={key}>
			<div>
				<b>{d.name}</b>
				<p>{dateStr}</p>
			</div>

			<div className="bitem_action_row">
				<div className="bitem_action">
					₩{d.price}
					<Earned buy={d.buy} />
				</div>

				<div>
					<button>Memo</button>
				</div>
			</div>
		</a>
	);
}

function dayParser(n: number) {
	let day = "Err";
	switch (n) {
	case 0:
		day = "Sun";
		break;
	case 1:
		day = "Mon";
		break;
	case 2:
		day = "Tue";
		break;
	case 3:
		day = "Wed";
		break;
	case 4:
		day = "Thu";
		break;
	case 5:
		day = "Fri";
		break;
	case 6:
		day = "Sat";
		break;
	}

	return day;
}

function Earned({ buy }: { buy: boolean }) {
	const earned = (
		<span className="buy_earned">Earned</span>
	);

	const spend = (
		<span className="buy_spend">Spend</span>
	);
	
	return buy ? spend : earned;
}
