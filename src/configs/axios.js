import axios from 'axios'
import { getAccessToken } from '@/utilities'

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		// 'Access-Control-Allow-Origin': '*',
		// 'Content-Type': 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
	},
})

axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = getAccessToken()
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

export default axiosInstance
