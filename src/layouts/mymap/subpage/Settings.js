import React, { useState } from 'react'
import {
	Avatar,
	ConfigProvider,
	Layout,
	Menu,
	Upload,
	Typography,
	Form,
	Cascader,
	Button,
	Input,
} from 'antd'
import { useSelector } from 'react-redux'
import {
	UploadOutlined,
	PlusOutlined,
	LoadingOutlined,
	UserOutlined,
	MailOutlined,
	LockOutlined,
	FlagOutlined,
} from '@ant-design/icons'
import { beforeUpload } from '@/utilities'
import Image from 'next/image'
import { STATE_CODE_NAME, STATE_NAME, STATE_NAME_CODE } from '@/constant'
import { UpdateSafety } from '@/api'

const { Text } = Typography

export default function Settings() {
	const [user, setUser] = useState(useSelector((state) => state.user))
	const [data, setData] = useState({
		email: user.email,
		profile: {
			name: user.name,
			location: user.location,
			avatar: user.avatar,
		},
	})

	const [imageUrl, setImageUrl] = useState(user?.avatar)
	const options = STATE_NAME.map((stateName) => ({
		value: stateName,
		label: stateName,
	}))

	function onChangeDisplayName(valueChanged, values) {
		if (valueChanged.name !== undefined) {
			const newProfile = { ...data.profile, name: valueChanged.name }
			setData({ ...data, profile: newProfile })
		} else {
			const newProfile = { ...data.profile, name: '' }
			setData({ ...data, profile: newProfile })
		}
	}

	const onChangePicture = (value, selectedOptions) => {
		const newProfile = {
			...data.profile,
			location: STATE_NAME_CODE[value[0]],
		}
		setData({ ...data, profile: newProfile })
	}

	const filter = (inputValue, path) =>
		path.some(
			(option) =>
				option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
		)

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const res = UpdateSafety(data)
			console.log(res.data)
		} catch (error) {
			return error
		}
	}

	return (
		<div className=" flex h-full justify-center px-6 pb-4 pt-4">
			<div className="flex h-full w-2/3  rounded-xl border border-primary bg-white shadow-xl">
				<div className="flex basis-1/3 flex-col items-center border-r border-primary pt-20 shadow-2xl">
					<Avatar src={imageUrl} size={180} />
					<div className="flex flex-col justify-start space-y-2">
						<div className="flex items-center">
							<div className="basis-1/6" />
							<h1 className=" grow text-xl font-black">{user.name}</h1>
						</div>
						<div className="flex items-center space-x-3">
							<UserOutlined className="basis-1/6" />
							<h1 className="grow">{user.email}</h1>
						</div>
						<div className="flex items-center space-x-1">
							<FlagOutlined className="basis-1/6" />
							<h1 className="grow">{STATE_CODE_NAME[user.location]}</h1>
						</div>
					</div>
				</div>

				<div className="flex h-full grow flex-col items-center justify-center">
					<div>
						<h1 className=" text-lg font-extrabold">Change your information</h1>
						<ConfigProvider
							theme={{
								token: {
									colorPrimary: '#E86A33',
									fontFamily: 'Roboto, san-serif',
								},
							}}
						>
							<Form
								className="mt-4"
								name="emailpassword"
								layout="vertical"
								requiredMark={false}
							>
								<Form.Item label="Email" className="font-medium" name="email">
									<Input
										defaultValue={user.email}
										className="h-10 w-96 rounded-xl border-2"
										prefix={<MailOutlined className="site-form-item-icon" />}
										placeholder={user.email}
									/>
								</Form.Item>
								<Form.Item label="Name" className="font-medium" name="name">
									<Input
										defaultValue={user.name}
										className="h-10 w-96 rounded-xl border-2"
										prefix={<UserOutlined className="site-form-item-icon" />}
										placeholder={user.name}
										onValuesChange={onChangeDisplayName}
									/>
								</Form.Item>
								<div className="focus:ring-blue-500 focus:border-blue-500 w-96 outline-none focus:ring-2">
									<Cascader
										className="w-96"
										options={options}
										onChange={onChangePicture}
										placeholder={user.location}
										showSearch={{
											filter,
										}}
										onSearch={(value) => console.log(value)}
									/>
								</div>
							</Form>
							<Button
								type="primary"
								className="mt-10 rounded-xl bg-primary"
								onClick={(e) => handleSubmit(e)}
							>
								Save
							</Button>
						</ConfigProvider>
					</div>
				</div>
			</div>
		</div>
	)
}
