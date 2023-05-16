import React, { useState } from 'react'
import { ConfigProvider, Layout, Menu } from 'antd'

const { Sider, Content } = Layout

export default function Settings() {
	const [selectedKey, setSelectedKey] = useState('item1')

	const handleMenuClick = (e) => {
		setSelectedKey(e.key)
	}
	return (
		<div className=" flex h-full justify-center px-6 pb-4 pt-4">
			<div className="flex h-full w-2/3 flex-col rounded-xl bg-white shadow-xl">
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#E86A33',
							fontFamily: 'Roboto, san-serif',
						},
					}}
				>
					<Layout className="">
						<Sider
							width={160}
							className="border-r border-r-primary pt-20"
							theme="light"
						>
							<Menu
								mode="inline"
								selectedKeys={[selectedKey]}
								onClick={handleMenuClick}
								className=" space-y-6"
							>
								<Menu.Item key="item2">
								<p className="text-sm font-black">Account Information</p>
								</Menu.Item>
								<Menu.Item key="item3">
								<p className="text-sm font-black">Item 1</p>
								</Menu.Item>
							</Menu>
						</Sider>

						<Layout className="bg-white ps-10 pt-6">
							<Content style={{ padding: '16px' }} className="">
								{selectedKey === 'item1' && (
									<div className="rounded-xl">Content for Item 1</div>
								)}
								{selectedKey === 'item2' && <div>Content for Item 2</div>}
								{selectedKey === 'item3' && <div>Content for Item 3</div>}
							</Content>
						</Layout>
					</Layout>
				</ConfigProvider>
			</div>
		</div>
	)
}
