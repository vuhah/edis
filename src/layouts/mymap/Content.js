import { DisasterMap, Dashboard, Friends, Settings } from './subpage'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { deleteCookie } from 'cookies-next'

const { Content } = Layout

export default function ContentMap() {
	const router = useRouter()

	const currentSubPage = useSelector((state) => state.mapControl.subPage)
	if (currentSubPage === 'logout') {
		deleteCookie('accessToken')
		router.push('/')
	}
	if (currentSubPage === 'telegram') {
		router.push('https://t.me/+PxAtq9lsxF9lZmI1', undefined, {
			target: '_blank',
			rel: 'noopener noreferrer',
		})
	}
	return (
		<Content>
			{currentSubPage === 'map' && <DisasterMap />}
			{currentSubPage === 'dashboard' && <Dashboard />}
			{currentSubPage === 'friend' && <Friends />}
			{currentSubPage === 'settings' && <Settings />}
		</Content>
	)
}
