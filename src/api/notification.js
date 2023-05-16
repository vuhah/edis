import { axiosInstance } from '@/configs'

export const DisasterNotification = async (page, numOfPage) => {
	try {
		const response = await axiosInstance.get(
			`notification/list/disaster?page=${page}&limit=${numOfPage}`,
		)
		return response.data
	} catch (error) {
		return []
	}
}

export const FriendSafetyNotification = async () => {
	try {
		const response = await axiosInstance.get(`notification/list?type=safety`)
		return response.data
	} catch (error) {
		return []
	}
}

export const FriendRequestNotification = async()=>{
	try {
		const response = await axiosInstance.get(`notification/list?type=friends`)
		return response.data
	} catch (error) {
		return []
	}
}

export const UpdateStatus = async (id, status) => {
	try {
		const response = await axiosInstance.patch('notification/updateStatus', {
			id: id,
			status: status,
		})
		return response.data
	} catch (error) {
		return {}
	}
}
