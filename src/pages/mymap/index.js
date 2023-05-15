import { useRouter } from 'next/router'
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from 'antd'
import { SiderMap, HeaderMap, ContentMap } from '@/layouts/mymap'
import Head from 'next/head'
import {
	SSE_disasterNotification,
	SSE_friendNotification,
	SSE_friendStatusNotification,
} from '@/components/sse'
import { FriendList, SearchByEmail } from '@/api'
import { setUser } from '@/redux/userSlice'
import { setFriendList } from '@/redux/friendSlice'

export default function Mymap() {
	const authStatus = useSelector((state) => state.authentication.authStatus)
	const mapSubPage = useSelector((state) => state.mapControl.subPage)
	const emailUser = useSelector((state) => state.user.email)
	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {
		const getUserByEmail = async () => {
			try {
				const data = await SearchByEmail({ email: emailUser })
				const infoUser = {
					id: data.id,
					name: data.profile.name,
					email: data.email,
					avatar: data.profile.avatar,
					location: data.profile.location,
					friends: data.friends,
					safetyStatus: data.safetyStatus,
				}
				dispatch(setUser(infoUser))
			} catch (error) {
				console.log(error)
			}
		}

		const getFriendList = async () => {
			try {
				const data = await FriendList()
				dispatch(setFriendList({ friends: data }))
			} catch (error) {
				console.log(error)
			}
		}

		if (!authStatus) {
			router.push('/login')
		} else {
			getUserByEmail()
			getFriendList()
		}
	}, [])

	const pageTitle = () => {
		if (mapSubPage === 'map') return 'Disaster Map - Edis'
		else if (mapSubPage === 'dashboard') return 'Dashboard - Edis'
		else if (mapSubPage === 'friend') return 'Friends - Edis'
		else if (mapSubPage === 'settings') return 'Edit profile - Edis'
		return 'Disaster Map - Edis'
	}

	return (
		<div>
			<Head>
				<title>{pageTitle()}</title>
			</Head>
			<SSE_disasterNotification />
			<SSE_friendNotification />
			<SSE_friendStatusNotification />
			<Layout className="h-screen">
				<SiderMap />
				<Layout>
					<HeaderMap />
					<ContentMap />
				</Layout>
			</Layout>
		</div>
	)
}
