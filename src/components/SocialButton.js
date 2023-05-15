import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { UserAddOutlined } from '@ant-design/icons'
import { GetRequest } from '@/api'
import { setRemoveRequest, setRequestsExits } from '@/redux/socialSlice'
import RequestFriendPanel from './RequestFriendPanel'

const SocialButton = () => {
	const dispatch = useDispatch()
	const listRequest = useSelector((state) => state.social.listRequest)
	const [count, setCount] = useState(listRequest.length)

	useEffect(() => {
		const getRequest = async () => {
			try {
				const data = await GetRequest()
				dispatch(setRequestsExits({ listRequests: data }))
			} catch (error) {
				console.log(error)
			}
		}
		getRequest()
	}, [listRequest])

	useEffect(() => {
		setCount(listRequest.length)
	}, [listRequest])

	const handleNotificationClick = () => {
		// TODO: Handle notification click
	}

	const handleClearNotifications = (e) => {
		dispatch(setRemoveRequest({ id: e.key }))
	}

	const menu = (
		<Menu>
			{listRequest.map((request) => (
				<Menu.Item
					key={request.user.id}
					onClick={(e) => handleClearNotifications(e)}
				>
					<RequestFriendPanel
						props={{
							id: request.requestId,
							avatar: request.user.profile.avatar,
							name: request.user.profile.name,
						}}
					/>
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
