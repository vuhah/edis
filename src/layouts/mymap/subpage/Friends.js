import { SearchEdis } from '@/components'
import { ConfigProvider, Anchor, Avatar, Button, Menu } from 'antd'
import Image from 'next/image'
import {
	FriendList,
	FriendRecommend,
	GetRequest,
	UnFriend,
	AddFriend,
} from '@/api'
import { STATE_CODE_NAME } from '@/constant'
import { useEffect, useState } from 'react'

const { Link } = Anchor

export default function Friends() {
	const [friends, setFriends] = useState([])
	const [resquest, setRequest] = useState([])
	const [recommendatios, setRecommendations] = useState([])

	const [currentTab, setCurrentTab] = useState('section1')
	const [trigger, setTrigger] = useState(false)

	const handleTabChange = (tab) => {
		setCurrentTab(tab.key)
	}

	useEffect(() => {
		async function getFriendList() {
			try {
				const data = await FriendList()
				console.log(data)
				setFriends(data)
			} catch (error) {
				setFriends([])
			}
		}

		async function getListRequest() {
			try {
				const data = await GetRequest()
				console.log(data)
				setRequest(data)
			} catch (error) {
				setRequest([])
			}
		}

		async function getRecommendation() {
			try {
				const data = await FriendRecommend()
				setRecommendations(data)
			} catch (error) {
				setRecommendations([])
			}
		}
		getFriendList()
		getListRequest()
		getRecommendation()
	}, [trigger])

	async function handleUnfriend(id) {
		try {
			const data = await UnFriend({ id })
			setTrigger(!trigger)
			console.log(data)
		} catch (error) {
			return null
		}
	}

	async function handleAddFriend(e, id) {
		e.preventDefault()
		try {
			const res = await AddFriend({ id })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="flex h-full justify-center px-6 pb-4 pt-4">
			<div className="flex h-full w-8/12 flex-col rounded-xl border border-primary bg-white shadow-xl">
				<div className="mx-6 mb-1 mt-4 flex items-center justify-between">
					<h1 className="text-lg font-bold text-default">Friends</h1>
					<div className="w-80">
						<SearchEdis />
					</div>
				</div>

				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#E86A33',
							fontFamily: 'Roboto, san-serif',
						},
					}}
				>
					<Menu
						mode="horizontal"
						selectedKeys={[currentTab]}
						onClick={handleTabChange}
						className="mx-2"
					>
						<Menu.Item key="section1">
							<h1 className=" font-semibold">Friends</h1>
						</Menu.Item>
						<Menu.Item key="section2">
							<h1 className=" font-semibold">Friend Requests</h1>
						</Menu.Item>
						<Menu.Item key="section3">
							<h1 className=" font-semibold">Suggestions</h1>
						</Menu.Item>
					</Menu>
				</ConfigProvider>

				<div className="mx-4 mt-5 grow overflow-y-scroll">
					{currentTab === 'section1' && (
						<div>
							{friends.length === 0 && (
								<div className="ms-2">
									You do not have any friends in your friend list.
								</div>
							)}

							{friends.length > 0 && (
								<div className="grid h-max grid-cols-2 gap-14">
									{friends.map((friend) => (
										<div
											className="flex items-center justify-between px-4"
											key={friend.id}
										>
											<div className="flex grow items-center space-x-2">
												{friend.profile.avatar ? (
													<Avatar src={friend.profile.avatar} size={52} />
												) : (
													<Avatar size={52}>{friend.profile.name}</Avatar>
												)}
												<div className="flex flex-col ">
													<p className="text-base font-semibold">
														{friend.profile.name}
													</p>
													<p className="text-small">
														{STATE_CODE_NAME[friend.profile.location]}
													</p>
												</div>
											</div>

											<div className="flex basis-1/5 justify-end pe-2">
												{friend.safetyStatus && (
													<div className="flex items-center">
														<Image
															src="/images/shield.png"
															alt="shield"
															width={20}
															height={20}
														/>
													</div>
												)}
												{!friend.safetyStatus && (
													<div className="flex items-center">
														<Image
															src="/images/warning.png"
															alt="warning"
															width={20}
															height={20}
														/>
													</div>
												)}
											</div>

											<ConfigProvider
												theme={{
													token: {
														colorPrimary: '#E86A33',
														fontFamily: 'Roboto, san-serif',
													},
												}}
											>
												<Button
													className="h-8 basis-1/5 rounded-xl bg-slate font-medium"
													type="primary"
													onClick={() => handleUnfriend(friend.id)}
												>
													<p className=" text-sm"> Remove</p>
												</Button>
											</ConfigProvider>
										</div>
									))}
								</div>
							)}
						</div>
					)}
					{currentTab === 'section2' && (
						<div>
							{resquest.length === 0 && (
								<div className="px-2">You do not have any friend requests.</div>
							)}
							{resquest.length > 0 && (
								<div className="grid h-max grid-cols-2 gap-14">
									{resquest.map((request) => (
										<div
											className="flex items-center justify-between px-4"
											key={request.id}
										>
											<div className="flex basis-2/5 items-center space-x-2">
												{request.profile.avatar ? (
													<Avatar src={request.profile.avatar} size={52} />
												) : (
													<Avatar size={52}>{request.profile.name}</Avatar>
												)}
												<div className="flex flex-col ">
													<p className="text-base font-semibold">
														{request.profile.name}
													</p>
													<p className="text-small">
														{STATE_CODE_NAME[request.profile.location]}
													</p>
												</div>
											</div>

											<div className="basis-1/5">
												{request.safetyStatus && (
													<div className="flex items-center space-x-2">
														<Image
															src="/images/shield.png"
															alt="shield"
															width={20}
															height={20}
														/>
													</div>
												)}
												{!request.safetyStatus && (
													<div className="flex items-center space-x-2">
														<Image
															src="/images/warning.png"
															alt="warning"
															width={20}
															height={20}
														/>
													</div>
												)}
											</div>

											<ConfigProvider
												theme={{
													token: {
														colorPrimary: '#E86A33',
														fontFamily: 'Roboto, san-serif',
													},
												}}
											>
												<Button
													className="h-8 basis-1/5 rounded-xl bg-slate font-medium"
													type="primary"
													onClick={() => handleUnfriend(friend.id)}
												>
													<p className=" text-sm"> Remove</p>
												</Button>
											</ConfigProvider>
										</div>
									))}
								</div>
							)}
						</div>
					)}
					{currentTab === 'section3' && (
						<div>
							{recommendatios.length === 0 && (
								<div className="px-2">You do not have any friend requests.</div>
							)}
							{recommendatios.length > 0 && (
								<div className="grid h-max grid-cols-2 gap-14">
									{recommendatios.map((item) => (
										<div
											className="flex items-center justify-between px-4"
											key={item.id}
										>
											<div className="flex basis-2/5 items-center space-x-2">
												{item.avatar ? (
													<Avatar src={item.avatar} size={52} />
												) : (
													<Avatar size={52}>{item.name}</Avatar>
												)}
												<div className="flex flex-col ">
													<p className="text-base font-semibold">{item.name}</p>
													<p className="text-small">{item.user.email}</p>
												</div>
											</div>

											<ConfigProvider
												theme={{
													token: {
														colorPrimary: '#E86A33',
														fontFamily: 'Roboto, san-serif',
													},
												}}
											>
												<Button
													type="primary"
													className="rounded-xl bg-primary"
													onClick={(e) => handleAddFriend(e, item.id)}
												>
													Add Friend
												</Button>
											</ConfigProvider>
										</div>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
