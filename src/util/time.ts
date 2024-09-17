export function dateTime() {
	let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
	let localISOString = new Date(Date.now() - tzoffset)
		.toISOString()
		.slice(0, -1);

	// convert to YYYY-MM-DDTHH:MM
	const datetimeInputString = localISOString.substring(
		0,
		((localISOString.indexOf("T") | 0) + 6) | 0
	);

	return datetimeInputString;
}
