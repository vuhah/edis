import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, ConfigProvider, message } from 'antd'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { setAuthStatus } from '@/redux/authSlice'
import { setUser } from '@/redux/userSlice'
import { Login } from '@/api'
import { decodeToken, setAccessToken } from '@/utilities'
import Head from 'next/head'

export default function LoginPage() {
	const dispatch = useDispatch()
	const authStatus = useSelector((state) => state.authentication.authStatus)
	const router = useRouter()

	useEffect(() => {
		if (authStatus) {
			router.push('/mymap')
		}
	}, [authStatus])

	const onFinish = async (values) => {
		const response = await Login(values.email, values.password)
		if (response) {
			const accessToken = response.data.accessToken
			const decodedToken = decodeToken(accessToken)
			setAccessToken(accessToken, decodedToken.exp)
			const infoUser = {
				id: decodedToken.profile.id,
				name: decodedToken.profile.name,
				email: decodedToken.email,
				avatar: decodedToken.profile.avatar,
				location: decodedToken.profile.location,
				safetyStatus: false,
				friends: [],
			}
			dispatch(setUser(infoUser))
			dispatch(setAuthStatus({ authenticated: true }))
		} else {
			message.error('Incorrect email or password!')
			dispatch(setAuthStatus({ authenticated: false }))
		}
	}

	return (
		<div className="animate__animated animate__fadeIn animate__delay-1s container">
			<Head>
				<title>Edis - Log in</title>
			</Head>
			<div className="flex h-screen w-screen items-center justify-evenly ">
				<div className="">
					<h1 className=" text-4xl font-extrabold text-primary">edis</h1>
					<p className="pt-4 text-3xl font-semibold text-default">
						Emergency Disaster <br /> Information Service
					</p>
				</div>
				<div className="">
					<h1 className="mb-8 text-2xl font-semibold">Login</h1>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: '#E86A33',
								fontFamily: 'Roboto, san-serif',
							},
						}}
					>
						<Form
							name="login"
							layout="vertical"
							requiredMark={false}
							onFinish={onFinish}
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

							<Form.Item>
								<div className="flex justify-between">
									<Form.Item name="remember" valuePropName="checked" noStyle>
										<Checkbox>Remember me</Checkbox>
									</Form.Item>
									<Link className="text-end" href="#">
										Forgot password
									</Link>
								</div>
							</Form.Item>

							<Form.Item>
								<Button
									className="h-10 w-full rounded-2xl bg-primary font-medium"
									type="primary"
									htmlType="submit"
								>
									Log in
								</Button>
							</Form.Item>

							<Form.Item>
								<Button
									className="w-5/4 h-10 rounded-2xl font-medium"
									type="default"
									block
								>
									<Link href="http://localhost:3000/auth/login/google">
										<div className="flex items-center justify-center">
											<FcGoogle />
											Log in with Google
										</div>
									</Link>
								</Button>
							</Form.Item>
						</Form>
					</ConfigProvider>
				</div>
			</div>
		</div>
	)
}
