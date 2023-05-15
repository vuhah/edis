import axiosInstance from '@/configs/axios'

export const AddNew = async (user) => {
	try {
		const response = await axiosInstance.post('user', user)
		return response
	} catch (error) {
		return error
	}
}

export const SearchByEmail = async ({ email }) => {
	try {
		const response = await axiosInstance.get(`user/${email}`)
		return response.data
	} catch (error) {
		return error
	}
}

export const GetUserList = async () => {
	try {
		const response = await axiosInstance.get('user/list')
		return response.data
	} catch (error) {
		return error
	}
}

export const UpdateSafety = async ({ safetyStatus }) => {
	try {
		const response = await axiosInstance.patch('user', { safetyStatus })
		return response.data
	} catch (error) {
		return error
	}
}
