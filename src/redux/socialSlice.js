import { createSlice } from '@reduxjs/toolkit'

export const socialSlice = createSlice({
	name: 'social',
	initialState: {
		listRequest: [],
	},
	reducers: {
		setRequestsExits: (state, action) => {
			state.listRequest = action.payload.listRequests
		},
		setNewRequest: (state, action) => {
			state.listRequest = [...state.listRequest, action.payload.request]
		},
		setRemoveRequest: (state, action) => {
			state.listRequest = state.listRequest.filter(
				(obj) => obj.requestId !== action.payload.id,
			)
		},
	},
})

export const { setRequestsExits, setNewRequest, setRemoveRequest } = socialSlice.actions
export default socialSlice.reducer
