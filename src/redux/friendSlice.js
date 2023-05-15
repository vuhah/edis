import { createSlice } from '@reduxjs/toolkit'

export const friendSlice = createSlice({
	name: 'friend',
	initialState: {
		friends: [],
	},
	reducers: {
		setFriendList: (state, action) => {
			state.friends = action.payload.friends
		},
		updateFriend: (state, action) => {
			const friendExist = state.friends.find(
				(obj) => obj.id === action.payload.id,
			)
			if (friendExist) {
				friendExist.safetyStatus = action.payload.safetyStatus
			}
		},
	},
})

export const { setFriendList, updateFriend } = friendSlice.actions
export default friendSlice.reducer
