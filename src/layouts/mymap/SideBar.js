import { ConfigProvider, Layout, Menu } from 'antd'
import Image from 'next/image'
import { getItemSider } from '@/utilities'
import { LogoWithBrandHorizontal } from '@/components/common/Logo'
import { useDispatch, useSelector } from 'react-redux'
import { setSubPage } from '@/redux/mapControlSlice'
import Link from 'next/link'

const { Sider } = Layout

const items = [
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
		'settings',
		<Image
			src="/images/sidebaricon/setting.png"
			alt="setting icon"
			width={24}
			height={24}
		/>,
		'Settings',
		[
			getItemSider('account', <></>, 'Account information'),
			getItemSider('password', <></>, 'Password'),
			getItemSider('location', <></>, 'Location'),
		],
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
				width={280}
				style={{
					background: '#fff',
					fontFamily: 'Roboto, san-serif',
				}}
			>
				<div className="ms-5 mt-3">
					{collapsedState ? (
						<div className="h-8"></div>
					) : (
						<>
							<LogoWithBrandHorizontal props={{ size: 36 }} />
						</>
					)}
				</div>

				<Menu
					mode="inline"
					defaultSelectedKeys={'map'}
					defaultOpenKeys={'map'}
					onClick={(e) => dispatch(setSubPage({ subPage: e.key }))}
					className="mt-4 space-y-5"
				>
					{items.map((item) => (
						<Menu.Item
							className="hover:bg-violet-600 h-60 space-x-4 text-sm font-semibold text-default"
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
