import { Login } from "./components/Login";
import { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import "./App.scss";

function App() {
	const [url, setUrl] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const raw = localStorage.getItem("token");
		setToken(raw);

		const rawUrl = localStorage.getItem("url");
		setUrl(rawUrl);
	}, [token]);

	return (
		token === null ? <Login /> : <Dashboard url={url} token={token} />
	);
}

export default App;
