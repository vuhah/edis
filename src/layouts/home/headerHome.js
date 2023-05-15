import { Logo } from '@/components/common/Logo'
import { Layout, ConfigProvider, Anchor } from 'antd'
import ButtonProps from '@/components/button'

function LoginButton() {
	return (
		<ButtonProps props={{ type: 'text', content: 'Login', url: '/login' }} />
	)
}

function SignupButton() {
	return (
		<ButtonProps
			props={{ type: 'primary', content: 'Sign up', url: '/signup' }}
		/>
	)
}

const { Header } = Layout

export default function HeaderHome() {
	return (
		<Header className="animate__aniamted animate__backInDown fixed left-0 right-0 top-0 z-50 bg-white">
			<div className="bg-blue-300 flex items-center justify-between px-12 pb-1">
				<div className="basis-1/4">
					<Logo props={{ size: 36 }} />
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
