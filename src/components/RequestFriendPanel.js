import { AcceptRequest } from '@/api'
import { setRemoveRequest } from '@/redux/socialSlice'
import { Avatar, ConfigProvider, Button } from 'antd'
import { useDispatch } from 'react-redux'

export default function RequestFriendPanel({ props }) {
	const dispatch = useDispatch()

	async function handleAccept(e, id) {
		e.preventDefault()
		try {
			const res = await AcceptRequest({ id })
			dispatch(setRemoveRequest({ id }))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="flex items-center justify-between space-x-8 ">
			<div className="flex items-center space-x-3">
				<Avatar src={props.avatar} size={52} />
				<div>
					<h1 className="font-semibold">{props.name}</h1> sent you a friend
					request.
				</div>
			</div>
			<div className="flex flex-col space-y-1">
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#E86A33',
							fontFamily: 'Roboto, san-serif',
						},
					}}
				>
					<Button
						className="h-8 rounded-xl bg-primary font-medium"
						type="primary"
						onClick={(e) => handleAccept(e, props.id)}
					>
						<p className=" text-sm"> Accept</p>
					</Button>
					<Button
						className="h-8 rounded-xl bg-slate font-medium text-default"
						type="primary"
						onClick={(e) => handleReject(e, props.id)}
					>
						<p className=" text-sm"> Delete</p>
					</Button>
				</ConfigProvider>
			</div>
		</div>
	)
}
