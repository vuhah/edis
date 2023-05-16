import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import userSlice from './userSlice'
import mapControlSlice from './mapControlSlice'
import notificationSlice from './notificationSlice'
import friendSlice from './friendSlice'
import socialSlice from './socialSlice'
import notificationTriggerSlice from './notificationsSlices'

export default configureStore({
	reducer: {
		authentication: authSlice,
		user: userSlice,
		mapControl: mapControlSlice,
		notification: notificationSlice,
		friend: friendSlice,
		social: socialSlice,
		notificationTrigger: notificationTriggerSlice,
	},
})
