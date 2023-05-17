import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Menu, Card, Avatar } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { SafetyOutlined } from '@ant-design/icons'
import { FriendSafetyNotification, UpdateStatus } from '@/api'
import { resetFriendSafetyTrigger } from '@/redux/notificationsSlices'
import Image from 'next/image'

const SafetyButton = () => {
	const dispatch = useDispatch()

	const triggerFriendSafety = useSelector(
		(state) => state.notificationTrigger.friendSafetyTrigger,
	)

	const [friendSafetyNotifcation, setfriendSafetyNotifcation] = useState([])

	async function getFriendSafetyNotification() {
		try {
			const data = await FriendSafetyNotification()
			setfriendSafetyNotifcation(data)
			dispatch(resetFriendSafetyTrigger())
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (triggerFriendSafety) {
			getFriendSafetyNotification()
		}
	}, [triggerFriendSafety])

	const handleNotificationClick = () => {
		// TODO: Handle notification click
	}

	async function UpdateStatusDisasterNotification(id, status) {
		try {
			const data = await UpdateStatus(id, status)
			getFriendSafetyNotification()
		} catch (error) {
			console.log(error)
		}
	}

	const handleClearNotifications = async (e) => {
		await UpdateStatusDisasterNotification(parseInt(e.key), 'Seen')
	}

	const [count, setCount] = useState(
		friendSafetyNotifcation.filter((obj) => obj.notification.status !== 'Seen')
			.length,
	)

	useEffect(() => {
		setCount(
			friendSafetyNotifcation.filter(
				(obj) => obj.notification.status !== 'Seen',
			).length,
		)
	}, [friendSafetyNotifcation])

	const menu = (
		<Menu className="max-h-96 overflow-y-auto">
			{friendSafetyNotifcation.map((noti) => (
				<Menu.Item
					key={noti.notification.id}
					onClick={(e) => handleClearNotifications(e)}
				>
					<div className="h-30 flex w-96 items-start justify-between">
						{noti.notification.body.includes('as Safe') && (
							<Card
								className="w-full"
								title={
									<div className="flex justify-between">
										{
											<div className="flex basis-2/3 items-center space-x-2">
												<Avatar src={noti.profile.avatar} size={24} />
												<p>{noti.profile.name}</p>
											</div>
										}
										<Image
											src="/images/shield.png"
											alt="safe"
											width={24}
											height={24}
										/>
										{noti.notification.status !== 'Seen' ? (
											<div className="flex basis-1/6 justify-end">
												<Badge color="#f50" />
											</div>
										) : (
											<div className="basis-1/6">
												<></>
											</div>
										)}
									</div>
								}
								size="small"
							>
								{noti.notification.body}
							</Card>
						)}

						{noti.notification.body.includes('as Not Safe') && (
							<Card
								className="w-full"
								title={
									<div className="flex justify-between">
										{
											<div className="flex basis-4/6 items-center space-x-2">
												<Avatar src={noti.profile.avatar} size={24} />
												<p>{noti.profile.name}</p>
											</div>
										}
										<Image
											src="/images/warning.png"
											alt="safe"
											width={24}
											height={24}
										/>
										{noti.notification.status !== 'Seen' ? (
											<div className="flex basis-1/6 justify-end">
												<Badge color="#f50" />
											</div>
										) : (
											<div className="basis-1/6">
												<></>
											</div>
										)}
									</div>
								}
								size="small"
							>
								{noti.notification.body}
							</Card>
						)}
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
				<SafetyOutlined style={{ fontSize: '20px' }} />
			</Badge>
		</Dropdown>
	)
}

export default SafetyButton

//"{\"notification\":{\"id\":4623,\"senderId\":21,\"receiverId\":7,\"objectId\":19,\"senderType\":\"User\",\"status\":\"Created\",\"type\":\"FriendRequest\",\"title\":\"New friend request\",\"body\":\"From Vu\",\"createdAt\":\"2023-05-16T10:18:44.672Z\",\"updatedAt\":\"2023-05-16T10:18:44.672Z\"},\"sender\":{\"id\":21,\"email\":\"edis10@gmail.com\",\"password\":\"$2b$10$.Ai375cE/yC3WYY9PfVdwODFA2oKbkFp5F/lk1uwP.146Fvb2iiva\",\"createdAt\":\"2023-05-16T10:18:31.608Z\",\"updatedAt\":\"2023-05-16T10:18:31.608Z\",\"safetyStatus\":true,\"profileId\":20,\"friends\":[],\"profile\":{\"id\":20,\"name\":\"Vu\",\"location\":\"WA\",\"avatar\":\"https://firebasestorage.googleapis.com/v0/b/edis-20d0d.appspot.com/o/avatars%2Frc-upload-1684065954669-3?alt=media&token=8d422b03-b654-43a3-ac65-0cd455e4bff2\",\"birthday\":null}}}"
