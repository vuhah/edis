import { DisasterMap, Dashboard, Friends, Settings } from './subpage'
import { Layout } from 'antd'
import { useSelector } from 'react-redux'

const { Content } = Layout

export default function ContentMap() {
	const currentSubPage = useSelector((state) => state.mapControl.subPage)

	return (
		<Content>
			{currentSubPage === 'map' && <DisasterMap />}
			{currentSubPage === 'dashboard' && <Dashboard />}
			{currentSubPage === 'friend' && <Friends />}
			{currentSubPage === 'settings' && <Settings />}
			{/* <DisasterMap id="map" />
			<Dashboard id="dashboard" />
			<Friends id="friend" />
			<Settings id="settings" /> */}
		</Content>
	)
}
