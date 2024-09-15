import { dateTime } from "../util/time";
import { time, dayParser, hour12 } from "../util/format";
import { Dispatch, SetStateAction, useState } from "react";

export function MemoViewer({ url, data, token, setOpen }: { url: string, token: string, data: any, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [edit, setEdit] = useState(false);
	
	if (edit) {
		return (
			<form className="memo_viewer" onSubmit={ev => {
				ev.preventDefault();
				
				const memoObj = document.getElementById("b_input_memo_2")!;
				const name = ev.currentTarget.dname.value;

				// @ts-ignore
				const date = Math.floor(new Date(ev.currentTarget.date.value) / 1000);
				const price = ev.currentTarget.price.value;
				const buy = ev.currentTarget.buy.value;
				const memo = memoObj.innerText;

				fetch(`${url}/balance/${data.id}`, {
					"method": "PUT",
					"mode": "cors",
					"headers": {
						"Authorization": token,
						"Content-Type": "application/json"
					},
					"body": JSON.stringify({
						"name": name,
						"date": date,
						"price": price,
						"buy": buy,
						"memo": memo
					})
				}).then(res => {
					console.log(res.status);
					if (res.status !== 200) {
						console.warn("error!");
						return;
					}

					setOpen(false);
				}).catch(err => {
					console.error("ERROR!", err);
				});
			}}>
				<View data={data} edit={edit} setOpen={setOpen} setEdit={setEdit} />
			</form>
		);
	}

	return (
		<div className="memo_viewer">
			<View data={data} edit={edit} setOpen={setOpen} setEdit={setEdit} />
		</div>
	);
}

function repl(edit: boolean, general: JSX.Element, replace: JSX.Element) {
	if (!edit) {
		return general;
	}

	return replace;
}

function View({ data, edit, setOpen, setEdit }: { data: any, edit: boolean, setOpen: Dispatch<SetStateAction<boolean>>, setEdit: Dispatch<SetStateAction<boolean>> }) {
	const [init, setInit] = useState(false);
	const date = new Date(data.date * 1000);

	if (edit) {
		if (!init) {
			setInit(true);

			setTimeout(() => {
				const memoObj = document.getElementById("b_input_memo_2")!;
				memoObj.innerText = data.memo;
			}, 50);
		}

	}
	
	return (
		<>
			<div className="mv_title">
				<span>ID {data.id}'s Info{edit ? " edit" : ""}</span>
				<h2 onClick={ev => {
					ev.preventDefault();
					setOpen(false);
				}}><i className="bi bi-x" /></h2>
			</div>
			<div className="title row">
				{repl(
					edit,
					<h1>{data.name}</h1>,
					<input name="dname" type="text" defaultValue={data.name} placeholder="Name" minLength={2} required />
				)}
				{repl(
					edit,
					<h3 onClick={ev => {
						ev.preventDefault();
						setEdit(!edit);
					}}><i className={"bi bi-pen"} /></h3>,
					<></>
				)}
			</div>
			
			<div className="row">
				<div className="obj">
					<div>
						<h3>ID</h3>
						<p>{data.id}</p>
					</div>
				</div>
				
				{repl(
					edit,
					<>
						<div className="obj">
							<h3>Date</h3>
							<span>
								{date.getFullYear()}-{time(date.getMonth() + 1)}-{time(date.getDate())} {dayParser(date.getDay())}
							</span>
						</div>

						<div className="obj">
							<h3>Time</h3>
							<span>
								{time(hour12(date))}:{time(date.getMinutes())} {date.getHours() >= 12 ? "PM" : "AM"}
							</span>
						</div>
					</>,
					<div className="obj">
						<h3>Datetime</h3>
						<input name="date" type="datetime-local" defaultValue={dateTime()} required />
					</div>
				)}

				<div className="obj">
					<h3>Price</h3>
					{repl(
						edit,
						<p className={`${data.buy ? "buy_spend" : "buy_earned"}`}>₩{data.price.toLocaleString()}</p>,
						<input name="price" type="number" defaultValue={data.price} required />
					)}
				</div>

			</div>
			
			{repl(
				edit,
				<></>,
				<div className="row_1">
					<div className="obj">
						<h3>Economy Type</h3>
						<div>
							<input name="buy" type="radio" value={1} defaultChecked={data.buy} />
							&nbsp;<span>Spend</span>
						</div>
						<div>
							<input name="buy" type="radio" value={0} defaultChecked={!data.buy} />
							&nbsp;<span>Earned</span>
						</div>
					</div>
				</div>
			)}

			<div className="title obj memo">
				<h3>Memo</h3>
				{repl(edit, <span>{data.memo}</span>, <div id="b_input_memo_2" contentEditable></div>)}
			</div>

			{!edit ? <></> : <button type="submit">Submit</button>}
		</>
	)
}
