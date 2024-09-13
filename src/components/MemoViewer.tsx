export function MemoViewer(data: any) {
	console.log(data.data.name);
	return (
		<div className="memo_viewer">
			<div className="mv_title">
				<span>{data.data.name}</span>
			</div>

			{/* TODO: create content and action row here */}

			{/* TODO: create memo here */}
		</div>
	);
}
