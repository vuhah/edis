import {
	ConfigProvider,
	Layout,
	AutoComplete,
	Dropdown,
	Space,
	Button,
} from 'antd'
import {
	TeamOutlined,
	NotificationOutlined,
	DownOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from '@ant-design/icons'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setCollapsed } from '@/redux/mapControlSlice'
import { SearchEdis } from '@/components'
import NotificationButton from '@/components/NotificationButton'
import SocialButton from '@/components/SocialButton'
import SafetyButton from '@/components/SafetyButton'

const { Header } = Layout

const navHeader = [
	{
		key: 'noti1',
		label: <NotificationOutlined />,
	},
	{
		key: 'noti',
		label: <TeamOutlined />,
	},
]

const items = [
	{
		label: <a href="https://www.antgroup.com">1st menu item</a>,
		key: '0',
	},
	{
		label: <a href="https://www.aliyun.com">2nd menu item</a>,
		key: '1',
	},
	{
		type: 'divider',
	},
	{
		label: '3rd menu item',
		key: '3',
	},
]

export default function HeaderMap() {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const collapsed = useSelector((state) => state.mapControl.collapsed)

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#E86A33',
					fontFamily: 'Roboto, san-serif',
				},
			}}
		>
			<Header className="flex items-center bg-white px-6 drop-shadow-md">
				<div className="basis-1/3">
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => dispatch(setCollapsed({ collapsed: !collapsed }))}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</div>

				<div className="basis-1/3">
					<SearchEdis />
				</div>

				<div className="flex basis-1/3 justify-end space-x-8">
					<NotificationButton />
					<SafetyButton />
					<SocialButton />

					<Image
						className="rounded-full"
						src={user.avatar}
						alt="useravatar"
						height={32}
						width={32}
					/>
				</div>
			</Header>
		</ConfigProvider>
	)
}
