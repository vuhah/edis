import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
	name: 'notifications',
	initialState: {
		listNoti: [],
		count: 0,
	},
	reducers: {
		setNewNotification: (state, action) => {
			const { notification } = action.payload.data
			const existingObj = state.listNoti.find(
				(obj) => obj.body === notification.body,
			)
			if (!existingObj) {
				notification.id = state.count
				state.count = state.count + 1
				notification.mark = false
				state.listNoti = state.listNoti.concat(notification)
				state.listNoti.reverse()
				if (state.listNoti.length > 12) state.listNoti.pop()
			}
		},
		setMarkNotification: (state, action) => {
			const obj = state.listNoti.find((item) => item.id == action.payload.id)
			if (obj) {
				obj.mark = true
			}
		},
		setRemoveNotification: (state, action) => {
			state.listNoti = state.listNoti.filter(
				(obj) => obj.id !== action.payload.id,
			)
			return state.listNoti
		},
	},
})

export const {
	setNewNotification,
	setMarkNotification,
	setRemoveNotification,
} = notificationSlice.actions
export default notificationSlice.reducer
