import { createSlice } from '@reduxjs/toolkit'

export const notificationTriggerSlice = createSlice({
	name: 'notificationTrigger',
	initialState: {
		friendSafetyTrigger: true,
		friendRequestTrigger: true,
		disasterTrigger: true,
	},
	reducers: {
		setFriendSafetyTrigger: (state, action) => {
			state.friendSafetyTrigger = true
		},
		resetFriendSafetyTrigger: (state, action) => {
			state.friendSafetyTrigger = false
		},
		setFriendRequestTrigger: (state, action) => {
			state.friendRequestTrigger = true
		},
		resetFriendRequestTrigger: (state, action) => {
			state.friendRequestTrigger = false
		},
		setDisasterTrigger: (state, action) => {
			state.disasterTrigger = true
		},
		resetDisasterTrigger: (state, action) => {
			state.disasterTrigger = false
		},
	},
})

export const {
	setFriendSafetyTrigger,
	resetFriendSafetyTrigger,
	setFriendRequestTrigger,
	resetFriendRequestTrigger,
	setDisasterTrigger,
	resetDisasterTrigger,
} = notificationTriggerSlice.actions
export default notificationTriggerSlice.reducer
