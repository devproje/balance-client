import { useEffect, useState } from "react";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

function App() {
	const [url, setUrl] = useState("");
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const raw = localStorage.getItem("token");
		setToken(raw);

		console.log(raw === null);
	}, [token]);

	return (
		token === null ? <Login setUrl={setUrl} /> : <Dashboard url={url} />
	);
}

export default App;
