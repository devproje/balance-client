export function Login() {
	const errMsg = document.getElementById("login_err_msg")!;

	return (
		<main className="center">
			<form className="login_form" onSubmit={ev => {
				ev.preventDefault();
				const URL = ev.currentTarget.url.value;
				const username = ev.currentTarget.username.value;
				const password = ev.currentTarget.password.value;

				if (URL === null || username === null || password === null) {
					return;
				}
				
				localStorage.setItem("url", URL);
				fetch(`${URL}/auth/login`, {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: JSON.stringify({
						"username": username,
						"password": password
					})
				}).then(res => {
					if (res.status !== 200) {
						if (res.status === 401) {
							errMsg.innerText = "Username or Password not matches";
							return;
						}

						throw Error();
					}

					res.json().then(json => {
						localStorage.setItem("token", json.token);
						window.location.reload();
					});
				}).catch(_ => {
					errMsg.innerText = "Cannot connect to Host Address";
				});
			}}>
				<h1 className="login_logo">Balance Client</h1>

				<div className="login_input_area">
					<p id="login_err_msg"></p>
					<input name="url" type="url" placeholder="Server URL" required />
					<input name="username" type="text" placeholder="Username" minLength={4} required />
					<input name="password" type="password" placeholder="Password" minLength={8} required />
				</div>
				
				<div className="login_action_row">
					<button>Login</button>
					<a>You cannot login?</a>
				</div>
			</form>
		</main>
	);
}
