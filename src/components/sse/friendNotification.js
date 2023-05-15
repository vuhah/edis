import { useEffect } from 'react'
import { getAccessToken } from '@/utilities'
import { SSE } from 'sse.js'
import { useDispatch } from 'react-redux'
import { GetRequest } from '@/api'

export default function SSE_friendNotification() {
	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	let url = `${process.env.NEXT_PUBLIC_API_URL}sse/friend-notification`

	// 	let source = new SSE(url, {
	// 		headers: {
	// 			'Content-Type': 'text/event-stream',
	// 			Authorization: `Bearer ${getAccessToken()}`,
	// 		},
	// 		method: 'GET',
	// 	})

	// 	source.addEventListener('message', (e) => {
	// 		if (e.data !== '[DONE]') {
	// 			console.log(e);
	// 			if (e.data !== '[]') {
	// 				const getRequest = async () => {
	// 					try {
	// 						const data = await GetRequest()
	// 						dispatch(setRequestsExits({ listRequests: data }))
	// 					} catch (error) {
	// 						console.log(error)
	// 					}
	// 				}
	// 				getRequest()
	// 				console.log(e.data);
	// 			}
	// 		} else {
	// 			source.close()
	// 		}
	// 	})
	// 	source.stream()
	// }, [])

	return null
}

//"[{"id":650,"senderId":1,"receiverId":3,"objectId":3,"senderType":"User","status":"Created","type":"FriendRequest","title":"New friend request","body":"From Baubau","createdAt":"2023-05-15T05:55:00.202Z","updatedAt":"2023-05-15T05:55:00.202Z"}]"
//"[{\"id\":651,\"senderId\":5,\"receiverId\":3,\"objectId\":4,\"senderType\":\"User\",\"status\":\"Created\",\"type\":\"FriendRequest\",\"title\":\"New friend request\",\"body\":\"From Vu\",\"createdAt\":\"2023-05-15T05:57:27.579Z\",\"updatedAt\":\"2023-05-15T05:57:27.579Z\"}]"
