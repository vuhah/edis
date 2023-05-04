import { Button, ConfigProvider } from 'antd'
import { useRouter } from 'next/router'

export default function ButtonProps({ props }) {
	const router = useRouter()
	function handleClick() {
		if (props.url) router.push(props.url)
	}
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#E86A33',
					fontFamily: 'Roboto, san-serif',
				},
			}}
		>
			{props.width === 'full' && props.type === 'primary' && (
				<Button
					className="h-10 w-full rounded-2xl bg-primary font-medium"
					type="primary"
					onClick={handleClick}
				>
					{props.content}
				</Button>
			)}
			{props.width !== 'full' && props.type === 'primary' && (
				<Button
					className="w-5/4 h-10 rounded-2xl bg-primary font-medium"
					type="primary"
					onClick={handleClick}
				>
					{props.content}
				</Button>
			)}
			{props.type === 'text' && (
				<Button type="text" onClick={handleClick}>
					{props.content}
				</Button>
			)}
		</ConfigProvider>
	)
}
