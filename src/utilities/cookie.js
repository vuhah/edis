import jwtDecode from 'jwt-decode'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'

export function decodeToken(accessToken) {
	try {
		const decoded = jwtDecode(accessToken)
		return decoded
	} catch (error) {
		console.log(error)
		return null
	}
}

export function setAccessToken(token, exp) {
	setCookie('accessToken', token, { maxAge: exp })
}

export function getAccessToken() {
	const cookieValue = getCookie('accessToken')
	return cookieValue ? decodeURIComponent(cookieValue) : null
}
