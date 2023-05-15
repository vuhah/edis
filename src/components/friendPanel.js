import { RejectFriend, AcceptRequest } from '@/api'
import { Button, Space } from 'antd'

export default function FriendPanel({ props }) {
	const accept = async () => {
		try {
			const res = AcceptRequest({ id: props.id })
		} catch (error) {
			return error
		}
	}

	const reject = async () => {
		try {
			const res = RejectFriend({ id: props.id })
		} catch (error) {
			return error
		}
	}

	return (
		<div>
			<Space wrap>
				<Button type="primary" onClick={accept}>
					Accept
				</Button>
				<Button onClick={reject}>Reject</Button>
			</Space>
		</div>
	)
}
