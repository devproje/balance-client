import { time, dayParser } from "../util/format";

export function MemoViewer({ data, setOpen }: { data: any, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
	const date = new Date(data.date * 1000);

	const hour12 = () => {
		const raw = date.getHours();
		if (raw > 12) {
			return raw - 12;
		}

		return raw;
	};

	return (
		<div className="memo_viewer">
			<div className="mv_title">
				<span>ID {data.id}'s Info</span>
				<h2 onClick={ev => {
					ev.preventDefault();
					setOpen(false);
				}}><i className="bi-x" /></h2>
			</div>
			<div className="title">
				<h1>{data.name}</h1>
			</div>
			
			<div className="row">
				<div className="obj">
					<div>
						<h3>ID</h3>
						<p>{data.id}</p>
					</div>
				</div>
				<div className="obj">
					<h3>Date</h3>
					<p>{date.getFullYear()}-{time(date.getMonth() + 1)}-{time(date.getDate())}</p>
				</div>

				<div className="obj">
					<h3>Time</h3>
					<p>{time(hour12())}:{time(date.getMinutes())} {date.getHours() >= 12 ? "PM" : "AM"}</p>
				</div>

				<div className="obj">
					<h3>Price</h3>
					<p>{data.buy ? "-" : "+"}{data.price}</p>
				</div>
			</div>

			<div className="title obj memo">
				<h3>Memo</h3>
				<pre>{data.memo}</pre>
			</div>
		</div>
	);
}
