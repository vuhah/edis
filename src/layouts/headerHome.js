import Logo from '@/components/logo'
import { Layout, ConfigProvider, Anchor } from 'antd'
import { useSelector } from 'react-redux'
import ButtonProps from '@/components/button'
import { Link } from 'next/link'

function LoginButton() {
	return (
		<ButtonProps
			props={{ type: 'text', content: 'Login', url: '/authentication/login' }}
		/>
	)
}

function SignupButton() {
	return (
		<ButtonProps
			props={{ type: 'primary', content: 'Sign up', url: '/user/add' }}
		/>
	)
}

const { Header } = Layout

export default function HeaderHome() {
	const authStatus = useSelector((state) => state.authentication.authStatus)

	return (
		<Header className="animate__aniamted animate__backInDown fixed left-0 right-0 top-0 z-50 bg-white">
			<div className="bg-blue-300 flex items-center justify-between px-12 pb-1">
				<div className="basis-1/4">
					<Logo />
				</div>
				<div className="flex basis-1/2 justify-center">
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: '#E86A33',
								fontFamily: 'Roboto, san-serif',
							},
						}}
					>
						<Anchor
							className="font-medium"
							direction="horizontal"
							items={[
								{
									key: 'about',
									href: '#about',
									title: 'About us',
								},
								{
									key: 'work',
									href: '#work',
									title: 'How it work',
								},
								{
									key: 'join',
									href: '#join',
									title: 'Join community',
								},
							]}
						/>
					</ConfigProvider>
				</div>

				<div className="flex basis-1/4 justify-end">
					<div>
						<LoginButton />
						<SignupButton />
					</div>
				</div>
			</div>
		</Header>
	)
}
