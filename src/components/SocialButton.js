import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { UserAddOutlined } from '@ant-design/icons'
import { FriendRequestNotification } from '@/api'
import { resetFriendRequestTrigger } from '@/redux/notificationsSlices'

const SocialButton = () => {
	const dispatch = useDispatch()

	const triggerFriendRequest = useSelector(
		(state) => state.notificationTrigger.friendRequestTrigger,
	)

	const [friendRequestNotifcation, setfriendRequestNotifcation] = useState([])

	async function getFriendRequestNotification() {
		try {
			const data = await FriendRequestNotification()
			setfriendRequestNotifcation(data)
			dispatch(resetFriendRequestTrigger())
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (triggerFriendRequest) {
			getFriendRequestNotification()
		}
	}, [triggerFriendRequest])

	const handleNotificationClick = () => {
		// TODO: Handle notification click
	}

	async function UpdateStatusDisasterNotification(id, status) {
		try {
			const data = await UpdateStatus(id, status)
			getFriendRequestNotification()
		} catch (error) {
			console.log(error)
		}
	}

	const handleClearNotifications = async (e) => {
		await UpdateStatusDisasterNotification(parseInt(e.key), 'Seen')
	}

	const [count, setCount] = useState(
		friendRequestNotifcation.filter((obj) => obj.status !== 'Seen').length,
	)

	useEffect(() => {
		setCount(
			friendRequestNotifcation.filter((obj) => obj.status !== 'Seen').length,
		)
	}, [friendRequestNotifcation])

	const menu = (
		<Menu className='max-h-96 overflow-y-auto'>
			{friendRequestNotifcation.map((request) => (
				<Menu.Item
					key={request.id}
					onClick={(e) => handleClearNotifications(e)}
				>
					{/* <RequestFriendPanel
						props={{
							id: request.requestId,
							avatar: request.user.profile.avatar,
							name: request.user.profile.name,
						}}
					/> */}
					{request.title} {request.body}
				</Menu.Item>
			))}
		</Menu>
	)

	return (
		<Dropdown
			overlay={menu}
			trigger={['click']}
			className="flex max-h-40 items-center"
		>
			<Badge count={count} offset={[0, 2]} onClick={handleNotificationClick}>
				<UserAddOutlined style={{ fontSize: '20px' }} />
			</Badge>
		</Dropdown>
	)
}

export default SocialButton
