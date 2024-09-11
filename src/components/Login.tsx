export function Login({ setUrl }: { setUrl: React.Dispatch<React.SetStateAction<string>> }) {
	return (
		<div className="container">
			<form onSubmit={ev => {
				ev.preventDefault();
				const URL = ev.currentTarget.url.value;
				const username = ev.currentTarget.username.value;
				const password = ev.currentTarget.password.value;

				if (URL === null || username === null || password === null) {
					return;
				}

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
						return;
					}

					return res.json();
				}).then(json => {
					setUrl(URL.current?.valueOf()!);
					localStorage.setItem("token", json.token);
					window.location.reload();
				});
			}}>
				<input name="url" type="text" placeholder="Server URL" />
				<input name="username" type="text" placeholder="Username" />
				<input name="password" type="password" placeholder="Password" />
				
				<button>Login</button>
			</form>
		</div>
	);
}
