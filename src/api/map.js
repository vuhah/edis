import { axiosInstance } from '@/configs'

export const Map = async () => {
	try {
		const response = await axiosInstance.get('disaster/map')
		return response.data
	} catch (error) {
		console.log(error)
	}
}
