import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { BellOutlined } from '@ant-design/icons'
import { DisasterNotification, UpdateStatus } from '@/api'
import { resetDisasterTrigger } from '@/redux/notificationsSlices'

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
			getDisasterNotification(1, 12)
		} catch (error) {
			console.log(error)
		}
	}

	const handleClearNotifications = async (e) => {
		await UpdateStatusDisasterNotification(parseInt(e.key), 'Seen')
	}

	const [count, setCount] = useState(
		disasterNotifcation.filter((obj) => obj.status !== 'Seen').length,
	)

	useEffect(() => {
		setCount(disasterNotifcation.filter((obj) => obj.status !== 'Seen').length)
	}, [disasterNotifcation])

	const menu = (
		<Menu className="max-h-96 overflow-y-auto">
			{disasterNotifcation.map((noti) => (
				<Menu.Item key={noti.id} onClick={(e) => handleClearNotifications(e)}>
					{noti.body}
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
