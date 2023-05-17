import React, { useEffect, useState } from 'react'
import { Badge, Card, Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { BellOutlined } from '@ant-design/icons'
import { DisasterNotification, UpdateStatus } from '@/api'
import { resetDisasterTrigger } from '@/redux/notificationsSlices'
import Image from 'next/image'
import { DISASTER_IMAGES, STATE_CODE_NAME } from '@/constant'
import { formatDate } from '@/utilities'

const NotificationButton = () => {
	const dispatch = useDispatch()

	const triggerDisasterStatus = useSelector(
		(state) => state.notificationTrigger.disasterTrigger,
	)

	const [disasterNotifcation, setDisasterNotification] = useState([])

	async function getDisasterNotification(page, numOfPage) {
		try {
			const data = await DisasterNotification(page, numOfPage)
			setDisasterNotification(data)
			dispatch(resetDisasterTrigger())
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (triggerDisasterStatus) {
			getDisasterNotification(1, 20)
		}
	}, [triggerDisasterStatus])

	const handleNotificationClick = () => {
		// TODO: Handle notification click
	}

	async function UpdateStatusDisasterNotification(id, status) {
		try {
			const data = await UpdateStatus(id, status)
			getDisasterNotification(1, 20)
		} catch (error) {
			console.log(error)
		}
	}

	const handleClearNotifications = async (e) => {
		await UpdateStatusDisasterNotification(parseInt(e.key), 'Seen')
	}

	const [count, setCount] = useState(
		disasterNotifcation.filter((obj) => obj.notification.status !== 'Seen')
			.length,
	)

	useEffect(() => {
		setCount(
			disasterNotifcation.filter((obj) => obj.notification.status !== 'Seen')
				.length,
		)
	}, [disasterNotifcation])

	const menu = (
		<Menu className="max-h-96  w-96  overflow-y-auto">
			{disasterNotifcation.map((noti) => (
				<Menu.Item
					key={noti.notification.id}
					onClick={(e) => handleClearNotifications(e)}
				>
					<Card
						className="w-full"
						size="small"
						title={
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Image
										src={DISASTER_IMAGES[noti.type]}
										alt="disaster"
										width={20}
										height={20}
									/>
									<p className="">{STATE_CODE_NAME[noti.location]}</p>
								</div>
								<div className="flex items-center space-x-4">
									<p> {formatDate(noti.notification.createdAt)}</p>
									{noti.notification.status === 'Seen' && (
										<div className=""></div>
									)}
									{noti.notification.status !== 'Seen' && (
										<div className="">
											<Badge color="#f50" />
										</div>
									)}
								</div>
							</div>
						}
					>
						{noti.notification.body}
					</Card>
					{/* <div className="flex items-center justify-between space-x-4 p-2">
						<div className="w-30 h-30 basis-2/12">
							<Image
								src={DISASTER_IMAGES[noti.type]}
								alt="disaster"
								width={30}
								height={30}
							/>
						</div>

						<div className="flex basis-9/12 flex-col">
							<p className=" font-semibold">{STATE_CODE_NAME[noti.location]}</p>
							<p className=" text-small">{noti.notification.body}</p>
						</div>

						{noti.notification.status === 'Seen' && (
							<div className="flex h-4 w-4  basis-1/12"></div>
						)}
						{noti.notification.status !== 'Seen' && (
							<div className="flex basis-1/12 justify-end">
								<Badge color="#f50" />
							</div>
						)}
					</div> */}
				</Menu.Item>
			))}
		</Menu>
	)

	return (
		<Dropdown overlay={menu} trigger={['click']} className="flex items-center">
			<Badge count={count} offset={[0, 2]} onClick={handleNotificationClick}>
				<BellOutlined style={{ fontSize: '20px' }} />
			</Badge>
		</Dropdown>
	)
}

export default NotificationButton
