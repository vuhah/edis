import { cookies } from 'next/dist/client/components/headers'

export const useAccessToken = () => {
	const accessToken = cookies.getItem('accessToken')
	return accessToken
}
