import { DISASTER_TYPES } from '@/constant'

export function getItemSider(key, icon, label, children) {
	return {
		key,
		icon,
		label,
		children,
	}
}

export function DisasterPanel({ data }) {
	return (
		<div>
			{Object.keys(data).map((disaster) => (
				<div key={disaster} className="disaster">
					<div>Name: {disaster}</div>
					<div>Level: {data[disaster].level}</div>
					<div>Tweets: {data[disaster].tweets}</div>
				</div>
			))}
		</div>
	)
}
