import { createSlice } from '@reduxjs/toolkit'
import { getAccessToken } from '@/utilities'

export const authSlice = createSlice({
	name: 'authentication',
	initialState: {
		authStatus: getAccessToken() ? true : false,
		email: '',
		profile: {},
	},
	reducers: {
		setAuthStatus: (state, action) => {
			if (action.payload.authenticated === true) {
				state.authStatus = true
			} else {
				state = [false, {}, {}]
			}
		},
		setUserInfor: (state, action) => {
			state.authStatus = true
			state.email = action.payload.email
			state.profile = action.payload.profile
		},
	},
})

export const { setAuthStatus, setUserInfor } = authSlice.actions
export default authSlice.reducer
