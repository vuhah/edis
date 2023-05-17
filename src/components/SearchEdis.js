import { useState, useEffect } from 'react'
import { AddFriend, GetUserList } from '@/api'
import { AutoComplete, Avatar, Button, List, Typography } from 'antd'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { STATE_CODE_NAME } from '@/constant'

const { Text } = Typography

export default function SearchEdis() {
	const [listUser, setListUser] = useState([])
	const [searchResults, setSearchResults] = useState([])
	const [inputValue, setInputValue] = useState('')
	const listFriends = useSelector((state) => state.friend.friends)
	const userId = useSelector((state) => state.user.id)

	useEffect(() => {
		const getListUser = async () => {
			try {
				const data = await GetUserList()
				setListUser(
					data.filter(
						(item) =>
							item.id !== userId &&
							item.profile.name !== '' &&
							item.profile.name !== null,
					),
				)
			} catch (error) {
				setListUser([])
			}
		}
		getListUser()
	}, [])

	const handleSearch = (value) => {
		setInputValue(value)

		if (value.trim() !== '') {
			const results = listUser.filter((user) =>
				user.profile.name.toLowerCase().includes(value.toLowerCase()),
			)
			setSearchResults(results)
		} else {
			setSearchResults([])
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

	const renderResult = (item) => {
		const isFriend = listFriends.find((obj) => obj.id === item.id)
		if (isFriend) {
			return {
				value: item.name,
				label: (
					<List.Item>
						<div className="flex items-center justify-between pe-2">
							<div className="flex items-center space-x-4">
								{item.profile.avatar ? (
									<Avatar src={item.profile.avatar} size={52} />
								) : (
									<Avatar size={52}>{item.profile.name}</Avatar>
								)}
								<div className="flex flex-col">
									<Text>{item.profile.name}</Text>
									<Text>{STATE_CODE_NAME[item.profile.location]}</Text>
								</div>
							</div>
							<p>
								{isFriend.safetyStatus ? (
									<Image
										src="/images/shield.png"
										alt="Safe"
										width={24}
										height={24}
									/>
								) : (
									<Image
										src="/images/warning.png"
										alt="Safe"
										width={24}
										height={24}
									/>
								)}
							</p>
						</div>
					</List.Item>
				),
			}
		} else {
			return {
				value: item.name,
				label: (
					<List.Item>
						<div className="flex items-center justify-between pe-2">
							<div className="flex items-center space-x-4">
								{item.profile.avatar ? (
									<Avatar src={item.profile.avatar} size={52} />
								) : (
									<Avatar size={52}>{item.profile.name}</Avatar>
								)}
								<div className="flex flex-col">
									<Text>{item.profile.name}</Text>
									<Text className="text-sm">{item.email}</Text>
								</div>
							</div>

							<Button
								type="primary"
								className=" rounded-xl bg-primary"
								onClick={(e) => handleAddFriend(e, item.id)}
							>
								Add Friend
							</Button>
						</div>
					</List.Item>
				),
			}
		}
	}

	return (
		<AutoComplete
			className="w-full"
			size="large"
			style={{ borderColor: '#ff7875' }}
			onChange={handleSearch}
			options={searchResults.map(renderResult)}
			placeholder="Search by name"
		/>
	)
}
