import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { BellOutlined } from '@ant-design/icons'
import { setMarkNotification } from '@/redux/notificationSlice'

const NotificationButton = () => {
	const dispatch = useDispatch()
	const listNotifications = useSelector((state) => state.notification.listNoti)
	const [count, setCount] = useState(
		listNotifications.filter((obj) => obj.mark === false).length,
	)

	useEffect(() => {
		setCount(listNotifications.filter((obj) => obj.mark === false).length)
	}, [listNotifications])

	const handleNotificationClick = () => {
		// TODO: Handle notification click
	}

	const handleClearNotifications = (e) => {
		dispatch(setMarkNotification({ id: e.key }))
	}

	const menu = (
		<Menu>
			{listNotifications.map((noti) => (
				<Menu.Item key={noti.id} onClick={(e) => handleClearNotifications(e)}>
					{noti.body}
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
				<BellOutlined style={{ fontSize: '20px' }} />
			</Badge>
		</Dropdown>
	)
}

export default NotificationButton
