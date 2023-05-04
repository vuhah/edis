import axiosInstance from '@/configs/axios'

export const AddNew = async (user) => {
	try {
		const response = await axiosInstance.post('/user', user)
		return response
	} catch (error) {
		return error
	}
}
