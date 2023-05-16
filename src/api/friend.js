import axiosInstance from '@/configs/axios'

export const FriendList = async () => {
	try {
		const response = await axiosInstance.get('friends/list')
		return response.data
	} catch (error) {
		return error
	}
}

export const AddFriend = async ({ id }) => {
	try {
		const response = await axiosInstance.post('friends', {
			invitedId: id,
		})
		return response
	} catch (error) {
		return error
	}
}

export const GetRequest = async () => {
	try {
		const response = await axiosInstance.get('friends/requests')
		return response.data
	} catch (error) {
		return error
	}
}

export const AcceptRequest = async ({ id }) => {
	try {
		const response = await axiosInstance.post('friends/accept', {
			id: id,
		})
		return response
	} catch (error) {
		return error
	}
}

export const UnFriend = async ({ id }) => {
	try {
		const response = await axiosInstance.post('friends/unfriend', {
			userId: id,
		})
		return response
	} catch (error) {
		return error
	}
}

export const RejectFriend = async ({ id }) => {
	try {
		const response = await axiosInstance.post('friends/reject', { id: id })
		return response
	} catch (error) {
		return error
	}
}
