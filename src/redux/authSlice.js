import { createSlice } from '@reduxjs/toolkit'
import { getAccessToken } from '@/utilities'


export const authSlice = createSlice({
	name: 'authentication',
	initialState: {
		authStatus: getAccessToken() ? true : false,
	},
	reducers: {
		setAuthStatus: (state, action) => {
			state.authStatus = action.payload.authenticated
		},
	},
})

export const { setAuthStatus } = authSlice.actions
export default authSlice.reducer
