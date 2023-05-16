import { SearchEdis } from '@/components'
import { ConfigProvider, Anchor, Avatar, Button } from 'antd'
import Image from 'next/image'
import { FriendList, UnFriend } from '@/api'
import { STATE_CODE_NAME } from '@/constant'
import { useEffect, useState } from 'react'

export default function Friends() {
	const [friends, setFriends] = useState([])

	useEffect(() => {
		async function getFriendList() {
			try {
				const data = await FriendList()
				setFriends(data)
			} catch (error) {
				setFriends([])
			}
		}
		getFriendList()
	}, [handleUnfriend])

	async function handleUnfriend(id) {
		try {
			const data = await UnFriend({ id })
			console.log(data)
		} catch (error) {
			return null
		}
	}

	return (
		<div className="flex h-full justify-center px-6 pb-4 pt-4">
			<div className="flex h-full w-8/12 flex-col rounded-lg border border-primary bg-white shadow-xl">
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
					<Anchor
						className="mx-6 my-1 font-medium"
						direction="horizontal"
						items={[
							{
								key: 'friends',
								href: '#friends',
								title: 'All friends',
							},
							{
								key: 'request',
								href: '#request',
								title: 'Friend Requests',
							},
							{
								key: 'suggest',
								href: '#suggest',
								title: 'Suggestions',
							},
						]}
					/>
				</ConfigProvider>

				<div className="mx-4 mb-4 mt-2 grow overflow-y-scroll">
					<div className="grid h-max grid-cols-2 gap-14" id="friends">
						{friends.map((friend) => (
							<div
								className="flex items-center justify-between p-2"
								key={friend.id}
							>
								<div className="flex basis-2/5 items-center space-x-2">
									{friend.profile.avatar ? (
										<Avatar src={friend.profile.avatar} size={52} />
									) : (
										<Avatar size={52}>{friend.profile.name}</Avatar>
									)}
									<div className="flex flex-col ">
										<p className="text-base">{friend.profile.name}</p>
										<p className="text-small">
											{STATE_CODE_NAME[friend.profile.location]}
										</p>
									</div>
								</div>

								<div className="basis-1/5">
									{friend.safetyStatus && (
										<div className="flex items-center space-x-2">
											<Image
												src="/images/shield.png"
												alt="shield"
												width={20}
												height={20}
											/>
										</div>
									)}
									{!friend.safetyStatus && (
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
				</div>
			</div>
		</div>
	)
}
