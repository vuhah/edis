import { createSlice } from '@reduxjs/toolkit'

export const safety = createSlice({
	name: 'safety',
	initialState: {
		self: {
			locationSafety: true,
			selfSafety: true,
		},
		friends: {},
	},
	reducers: {
		setSubPage: (state, action) => {
			state.subPage = action.payload.subPage
		},
		setCollapsed: (state, action) => {
			state.collapsed = action.payload.collapsed
		},
	},
})

export const { setSubPage, setCollapsed } = mapControlSlice.actions
export default mapControlSlice.reducer
