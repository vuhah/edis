import { SearchEdis } from '@/components'
import { ConfigProvider, Anchor, Avatar, Button } from 'antd'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { UnFriend } from '@/api'
import { STATE_CODE_NAME } from '@/constant'

export default function Friends() {
	const friends = useSelector((state) => state.friend.friends)

	async function handleUnfriend(e, id) {
		e.preventDefault()
		try {
			await UnFriend({ id })
		} catch (error) {
			error
		}
	}

	return (
		<div className="flex h-full justify-center px-6 pb-4 pt-4">
			<div className="flex h-full w-4/6 flex-col rounded-lg border border-primary bg-white shadow-xl">
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
					<div className="grid h-max grid-cols-2 gap-12" id="friends">
						{friends.map((friend) => (
							<div
								className="flex items-center justify-between"
								key={friend.id}
							>
								<div className="flex items-center space-x-6">
									<Avatar src={friend.profile.avatar} size={72} />
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-semibold">
											{friend.profile.name}
										</p>
										<p className="text-sm font-semibold">
											{STATE_CODE_NAME[friend.profile.location]}
										</p>
									</div>
								</div>
								{friend.safetyStatus && (
									<div className="flex items-center space-x-2">
										<Image
											src="/images/shield.png"
											alt="shield"
											width={18}
											height={18}
										/>
										<p>Safe</p>
									</div>
								)}
								{!friend.safetyStatus && (
									<div className="flex items-center space-x-2">
										<Image
											src="/images/warning.png"
											alt="warning"
											width={18}
											height={18}
										/>
										<p>Unsafe</p>
									</div>
								)}
								<ConfigProvider
									theme={{
										token: {
											colorPrimary: '#E86A33',
											fontFamily: 'Roboto, san-serif',
										},
									}}
								>
									<Button
										className="h-8 rounded-xl bg-slate font-medium"
										type="primary"
										onClick={(e) => handleUnfriend(e, friend.id)}
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
