import { useEffect } from "react";

export function Dashboard({ url }: { url: string }) {
	useEffect(() => {
		localStorage.removeItem("token");
		window.location.reload();
	});
	
	return (
		<>Hello, World!</>
	);
}
