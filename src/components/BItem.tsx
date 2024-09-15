import { useState } from "react";
import { MemoViewer } from "./MemoViewer";
import { time, dayParser } from "../util/format";

export function BItem({ d, n, url, token }: { d: any, n: number, url: string, token: string }) {
	const date = new Date(d.date * 1000);
	const [open, setOpen] = useState(false);

	let dateStr = `${date.getFullYear()}-${time(date.getMonth() + 1)}-${time(date.getDate())} ${dayParser(date.getDay())} `;
	dateStr += `${time(date.getHours())}:${time(date.getMinutes())}`;

	const render = open ? <MemoViewer url={url} token={token} data={d} setOpen={setOpen} /> : <></>;
	return (
		<a className="bal_item" key={n}>
			<div>
				<b>{d.name}</b>
				<p>{dateStr}</p>
			</div>

			<div className="bitem_action_row">
				<div className={`bitem_action ${d.buy ? "buy_spend" : "buy_earned"}`}>
					<span>₩{d.price.toLocaleString()}</span>
				</div>

				<div>
					<button onClick={ev => {
						ev.preventDefault();
						setOpen(true);
					}}>Memo</button>
				</div>
			</div>
			{render}
		</a>
	);
}
