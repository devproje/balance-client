export function dayParser(n: number) {
	let day = "Err";
	switch (n) {
	case 0:
		day = "Sun";
		break;
	case 1:
		day = "Mon";
		break;
	case 2:
		day = "Tue";
		break;
	case 3:
		day = "Wed";
		break;
	case 4:
		day = "Thu";
		break;
	case 5:
		day = "Fri";
		break;
	case 6:
		day = "Sat";
		break;
	}

	return day;
}

export function time(n: number) {
	if (n < 10) {
		return `0${n}`;
	}

	return n;
}
