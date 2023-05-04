import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		name: '',
		email: '',
		avatar: '',
		location: '',
		friends: [],
	},
	reducers: {
		setUser: (state, action) => {
			return { ...action.payload }
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
