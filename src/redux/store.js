import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import userSlice from './userSlice'

export default configureStore({
	reducer: {
		authentication: authSlice,
		user:userSlice
	},
})
