import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Menu, Avatar, ConfigProvider, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { UserAddOutlined } from '@ant-design/icons'
import { FriendRequestNotification, AcceptRequest, RejectFriend } from '@/api'
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

	const handleClearNotifications = async (e) => {
		try {
			getFriendRequestNotification()
		} catch (error) {
			console.log(error)
		}
	}

	const [count, setCount] = useState(friendRequestNotifcation.length)

	useEffect(() => {
		setCount(friendRequestNotifcation.length)
	}, [friendRequestNotifcation])

	async function handleAccept(id) {
		try {
			const res = await AcceptRequest({ id })
			getFriendRequestNotification()
		} catch (error) {
			console.log(error)
		}
	}

	async function handleReject(e, id) {
		try {
			const res = await RejectFriend({ id })
			getFriendRequestNotification()

			return null
		} catch (error) {
			return error
		}
	}

	const menu = (
		<Menu className="max-h-96 overflow-y-auto">
			{friendRequestNotifcation.map((request) => (
				<Menu.Item
					key={request.notification.id}
					onClick={(e) => handleClearNotifications(e)}
				>
					<div className="flex items-center justify-between space-x-8 ">
						<div className="flex items-center space-x-3">
							<Avatar src={request.profile.avatar} size={52} />
							<div>
								<h1 className="font-semibold">{request.profile.name}</h1> sent
								you a friend request.
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
									onClick={() => handleAccept(request.senderId)}
								>
									<p className=" text-sm"> Accept</p>
								</Button>
								<Button
									className="h-8 rounded-xl bg-slate font-medium text-default"
									type="primary"
									onClick={() => handleReject(request.profile.id)}
								>
									<p className=" text-sm"> Delete</p>
								</Button>
							</ConfigProvider>
						</div>
					</div>
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
