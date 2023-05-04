import { decodeToken } from '@/utilities'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthStatus, setUserInfor } from '@/redux/authSlice'
import { setAccessToken } from '@/utilities'
import { useEffect } from 'react'

export default function GetTokenComponent() {
	const authStatus = useSelector((state) => state.authentication.authStatus)
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		if (authStatus) router.push('/mymap')
	}, [authStatus])

	const { accessToken } = router.query
	if (accessToken) {
		const decodedToken = decodeToken(accessToken)
		setAccessToken(accessToken, decodedToken.exp)
		dispatch(
			setUserInfor({
				email: decodedToken.email,
				profile: decodedToken.profile,
			}),
		)
		dispatch(setAuthStatus({ authenticated: true }))
	}

	return <div></div>
}
