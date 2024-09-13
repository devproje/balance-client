export function InputModal({ url, token }: { url: string, token: string }) {
	return (
		<form className="input_modal" onSubmit={ev => {
			ev.preventDefault();
			const memoObj = document.getElementById("b_input_memo");

			let name = ev.currentTarget.bname.value;
			const date = ev.currentTarget.date.value;
			let price = ev.currentTarget.price.value;
			const buy = ev.currentTarget.buy.value;
			let memo = memoObj?.innerText;

			console.log(buy);

			// @ts-ignore
			const unix = Math.floor(new Date(date) / 1000);
			console.log(unix);
			fetch(`${url}/balance`, {
				"method": "POST",
				"mode": "cors",
				"headers": {
					"Authorization": token,
					"Content-Type": "application/json"
				},
				"body": JSON.stringify({
					"name": name,
					"date": unix,
					"price": price,
					"buy": buy,
					"memo": memo
				})
			}).then(res => {
				if (res.status !== 301) {
					return;
				}

				console.log("data sent");
			})

			name = "";
			price = 0;
			memo = "";
		}}>
			<div className="input_text_row">
				<div>
					<p>Name</p>
					<input name="bname" type="text" placeholder="Item Name" minLength={2} required />
				</div>
				<div>
					<p>Date</p>
					<input name="date" type="datetime-local" required />
				</div>
				<div>
					<p>Price</p>
					<input name="price" type="number" placeholder="price" required />
				</div>
			</div>

			<div className="input_row">
				<div className="input_buy_item">
					<input name="buy" type="radio" value={1} required defaultChecked />
					<span>Spend</span>
				</div>
				<div className="input_buy_item">
					<input name="buy" type="radio" value={0} required />
					<span>Earned</span>
				</div>
			</div>

			<div className="input_col">
				<p>Memo</p>
				<div id="b_input_memo" contentEditable={true}></div>
			</div>

			<div className="input_row">
				<button>Create</button>
			</div>
		</form>
	)
}
