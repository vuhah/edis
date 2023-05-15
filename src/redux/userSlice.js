import { createSlice } from '@reduxjs/toolkit'
import { getAccessToken, decodeToken } from '@/utilities'

const decodedToken = getAccessToken() ? decodeToken(getAccessToken()) : null
const infoUser = decodedToken
	? {
			id: decodedToken.profile.id,
			name: decodedToken.profile.name,
			email: decodedToken.email,
			avatar: decodedToken.profile.avatar,
			location: decodedToken.profile.location,
			safetyStatus: false,
			safetyLocation: false,
			friends: [],
	  }
	: {
			id: '',
			name: '',
			email: '',
			avatar: '/images/logoImage.png',
			location: '',
			safetyStatus: false,
			safetyLocation: false,
			friends: [],
	  }

export const userSlice = createSlice({
	name: 'user',
	initialState: infoUser,
	reducers: {
		setUser: (state, action) => {
			return { ...action.payload }
		},
		setFriends: (state, action) => {
			return { ...state, friends: action.payload.friends }
		},
		setSafetyLocation: (state, action) => {
			return { ...state, safetyLocation: action.payload.safetyLocation }
		},
		setSafetyStatus: (state, action) => {
			return { ...state, safetyStatus: action.payload.safetyStatus }
		},
	},
})

export const { setUser, setSafetyStatus, setSafetyLocation } = userSlice.actions
export default userSlice.reducer
