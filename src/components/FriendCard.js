import { Avatar, Button, Dropdown, Menu } from 'antd'
import { CaretDownOutlined, DeleteOutlined } from '@ant-design/icons'

const FriendCard = ({ friend }) => {
	const menu = (
		<Menu>
			<Menu.Item key="unfriend">
				<Button type="link" icon={<DeleteOutlined />}>
					Unfriend
				</Button>
			</Menu.Item>
		</Menu>
	)

	return (
		<div className="flex items-center space-x-4 rounded-md p-4">
			<div className="">
				<Avatar src={friend.profile.avatar} size={64} />
			</div>

			<div className="flex-shrink-0">
				<Dropdown overlay={menu}>
					<Button type="link" icon={<CaretDownOutlined />} />
				</Dropdown>
			</div>
		</div>
	)
}

export default FriendCard
