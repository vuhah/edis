export default function Frame({ props }) {
	return (
		<div className="rounded-2xl border-2 border-primary p-2">
			{props.content}
		</div>
	)
}

