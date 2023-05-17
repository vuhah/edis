import { ConfigProvider, Layout, Menu } from 'antd'
import Image from 'next/image'
import { getItemSider } from '@/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { setSubPage } from '@/redux/mapControlSlice'

const { Sider } = Layout

const items = [
	getItemSider(
		'logo',
		<Image
			src="/images/logoImage.png"
			alt="logo icon"
			width={24}
			height={24}
		/>,
		<p className=" text-lg font-extrabold text-primary">edis</p>,
	),
	getItemSider(
		'map',
		<Image
			src="/images/sidebaricon/map.png"
			alt="map icon"
			width={24}
			height={24}
		/>,
		'Disaster Map',
	),
	getItemSider(
		'dashboard',
		<Image
			src="/images/sidebaricon/dashboard.png"
			alt="dashboard"
			width={24}
			height={24}
		/>,
		'Dashboard',
	),
	getItemSider(
		'friend',
		<Image
			src="/images/sidebaricon/friend.png"
			alt="group icon"
			width={24}
			height={24}
		/>,
		'Friends',
	),
	getItemSider(
		'telegram',
		<Image
			src="/images/sidebaricon/telegram.png"
			alt="telegram"
			width={24}
			height={24}
		/>,
		'Telegram Channel',
	),
	getItemSider(
		'settings',
		<Image
			src="/images/sidebaricon/setting.png"
			alt="setting icon"
			width={24}
			height={24}
		/>,
		'Settings',
	),
	getItemSider(
		'logout',
		<Image
			src="/images/sidebaricon/logout.png"
			alt="setting icon"
			width={24}
			height={24}
		/>,
		'Logout',
	),
]

export default function SiderMap() {
	const collapsedState = useSelector((state) => state.mapControl.collapsed)
	const dispatch = useDispatch()

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#E86A33',
					fontFamily: 'Roboto, san-serif',
				},
			}}
		>
			<Sider
				trigger={null}
				className="border-e border-primary"
				collapsible
				collapsed={collapsedState}
				collapsedWidth={80}
				width={240}
				style={{
					background: '#fff',
					fontFamily: 'Roboto, san-serif',
				}}
			>
				<Menu
					mode="inline"
					defaultSelectedKeys={'map'}
					defaultOpenKeys={'map'}
					onClick={(e) => dispatch(setSubPage({ subPage: e.key }))}
					className="mt-4 space-y-5"
				>
					{items.map((item) => (
						<Menu.Item
							className="hover:bg-violet-600 h-60 space-x-4 text-small font-bold text-default"
							key={item.key}
							icon={item.icon}
						>
							{item.label}
						</Menu.Item>
					))}
				</Menu>
			</Sider>
		</ConfigProvider>
	)
}
