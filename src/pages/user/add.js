import { useState } from 'react'
import {
	LockOutlined,
	MailOutlined,
	UserOutlined,
	PlusOutlined,
	LoadingOutlined,
} from '@ant-design/icons'
import {
	Steps,
	Form,
	Input,
	ConfigProvider,
	message,
	Upload,
	Cascader,
	Button,
} from 'antd'
import storage from '@/configs/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { stateNames } from '@/constrants/usaState'
import { beforeUpload, setAccessToken } from '@/utilities'
import { AddNew } from '@/api'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/userSlice'
import { setAuthStatus } from '@/redux/authSlice'
import { useRouter } from 'next/router'

export default function App() {
	const [current, setCurrent] = useState(0)
	const [data, setData] = useState({
		email: '',
		password: '',
		profile: {
			name: '',
			avatar: '',
			location: '',
		},
	})
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState()
	const dispatch = useDispatch()
	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await AddNew(data)
			console.log(response)
			const infoUser = {
				name: data.profile.name,
				email: data.email,
				avatar: data.profile.avatar,
				location: data.profile.location,
				friends: [...response.data.friends],
			}
			dispatch(setUser(infoUser))
			router.push('/authentication/login')
		} catch {
			message.error('Something went wrong! Register again!')
		}
	}

	const onChange = (value) => {
		console.log(data)
		setCurrent(value)
	}

	function onChangeEmailPwForm(valueChanged, values) {
		if (valueChanged.email !== undefined)
			setData({ ...data, email: valueChanged.email, password: values.password })
		if (valueChanged.password !== undefined)
			setData({ ...data, email: values.email, password: valueChanged.password })
	}

	function onChangeDisplayName(valueChanged, values) {
		if (valueChanged.name !== undefined) {
			const newProfile = { ...data.profile, name: valueChanged.name }
			setData({ ...data, profile: newProfile })
		} else {
			const newProfile = { ...data.profile, name: '' }
			setData({ ...data, profile: newProfile })
		}
	}

	function EmailAndPwForm() {
		return (
			<div className="animate__animated animate__backInUp">
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#E86A33',
							fontFamily: 'Roboto, san-serif',
						},
					}}
				>
					<Form
						name="emailpassword"
						layout="vertical"
						requiredMark={false}
						onValuesChange={onChangeEmailPwForm}
					>
						<Form.Item
							label="Email"
							className="font-medium"
							name="email"
							rules={[
								{
									type: 'email',
									message: 'Please enter a valid email address!',
								},
								{
									required: true,
									message: 'Please enter your email address!',
								},
							]}
						>
							<Input
								className="h-10 w-96 rounded-xl border-2"
								prefix={<MailOutlined className="site-form-item-icon" />}
								placeholder="Username"
							/>
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please enter your password!',
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined className="site-form-item-icon" />}
								className="h-10 w-96 rounded-xl border-2"
							/>
						</Form.Item>
					</Form>
				</ConfigProvider>
			</div>
		)
	}

	function NameForm() {
		return (
			<div className="animate__animated animate__backInUp">
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#E86A33',
							fontFamily: 'Roboto, san-serif',
						},
					}}
				>
					<Form
						name="name"
						layout="vertical"
						requiredMark={false}
						onValuesChange={onChangeDisplayName}
					>
						<Form.Item
							label="Display Name"
							className="font-medium"
							name="name"
							rules={[
								{
									type: 'text',
									message: 'Please enter your name!',
								},
								{
									required: true,
									message: 'Please enter your name!',
								},
							]}
						>
							<Input
								className="h-10 w-96 rounded-xl border-2"
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Username"
							/>
						</Form.Item>
					</Form>
				</ConfigProvider>
			</div>
		)
	}

	function PictureForm() {
		const handleChange = async ({ file }) => {
			if (file.status === 'uploading') {
				setLoading(true)
			}
			const storageRef = ref(storage)
			const avatarRef = ref(storageRef, `avatars/${file.uid}`)
			const uploadTask = uploadBytesResumable(avatarRef, file.originFileObj)

			uploadTask.on(
				'state_changed',
				(snapshot) => {},
				(error) => {
					console.log(error)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setLoading(false)
						setImageUrl(downloadURL)
						const newProfile = { ...data.profile, avatar: downloadURL }
						setData({ ...data, profile: newProfile })
					})
				},
			)
		}
		const uploadButton = (
			<div className='className="animate__animated animate__backInUp"'>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div
					style={{
						marginTop: 8,
					}}
				>
					Upload
				</div>
			</div>
		)
		return (
			<div>
				<Upload
					name="avatar"
					listType="picture-circle"
					className="avatar-uploader"
					showUploadList={false}
					beforeUpload={beforeUpload}
					onChange={handleChange}
				>
					{imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
				</Upload>
			</div>
		)
	}

	function LocationForm() {
		const options = stateNames.map((stateName) => ({
			value: stateName,
			label: stateName,
		}))

		const onChange = (value, selectedOptions) => {
			const newProfile = { ...data.profile, location: value[0] }
			setData({ ...data, profile: newProfile })
		}

		const filter = (inputValue, path) =>
			path.some(
				(option) =>
					option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
			)

		return (
			<div className="animate__animated animate__backInUp flex flex-col items-center">
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#E86A33',
							fontFamily: 'Roboto, san-serif',
						},
					}}
				>
					<Cascader
						className="w-80"
						options={options}
						onChange={onChange}
						placeholder="Please select"
						showSearch={{
							filter,
						}}
						onSearch={(value) => console.log(value)}
					/>
				</ConfigProvider>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#E86A33',
							fontFamily: 'Roboto, san-serif',
						},
					}}
				>
					<Button
						className=" mt-8 h-10 w-80 rounded-2xl bg-primary font-medium"
						type="primary"
						onClick={(e) => handleSubmit(e)}
					>
						Register
					</Button>
				</ConfigProvider>
			</div>
		)
	}

	return (
		<div className="container">
			<div className="flex h-screen">
				<div className="flex basis-1/2 flex-col items-center justify-center">
					<div>
						<h1 className=" text-5xl font-extrabold text-primary">edis</h1>
						<ConfigProvider
							theme={{
								token: {
									colorPrimary: '#E86A33',
									fontFamily: 'Roboto, san-serif',
								},
							}}
						>
							<Steps
								progressDot
								current={current}
								onChange={onChange}
								direction="vertical"
								className="mt-10"
							>
								<Steps className=" h-20" title="Email & password" />
								<Steps className=" h-20" title="Display name" />
								<Steps className=" h-20" title="Profile picture" />
								<Steps className=" h-20" title="Location" />
							</Steps>
						</ConfigProvider>
					</div>
				</div>
				<div className="flex basis-1/2 flex-col items-center justify-center">
					<div>
						{current === 0 ? (
							EmailAndPwForm()
						) : current === 1 ? (
							NameForm()
						) : current === 2 ? (
							PictureForm()
						) : current === 3 ? (
							LocationForm()
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
