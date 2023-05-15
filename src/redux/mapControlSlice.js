import { createSlice } from '@reduxjs/toolkit'

export const mapControlSlice = createSlice({
	name: 'mapControl',
	initialState: {
		subPage: 'map',
		collapsed: false,
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
