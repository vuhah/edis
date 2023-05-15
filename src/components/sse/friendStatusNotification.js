import { useEffect } from 'react'
import { getAccessToken } from '@/utilities'
import { SSE } from 'sse.js'
import { useDispatch } from 'react-redux'
import { setNewNotification } from '@/redux/notificationSlice'
import { updateFriend } from '@/redux/friendSlice'

export default function SSE_friendStatusNotification() {
	const dispatch = useDispatch()

	useEffect(() => {
		let url = `${process.env.NEXT_PUBLIC_API_URL}sse/friend-status-notification`

		let source = new SSE(url, {
			headers: {
				'Content-Type': 'text/event-stream',
				Authorization: `Bearer ${getAccessToken()}`,
			},
			method: 'GET',
		})

		source.addEventListener('message', (e) => {
			if (e.data !== '[DONE]') {
				if (e.data !== '') {
					dispatch(
						setNewNotification({
							data: JSON.parse(e.data),
						}),
					)
					dispatch(updateFriend(JSON.parse(e.data).friendUser))
				}
			} else {
				source.close()
			}
		})
		source.stream()
	}, [])

	return null
}
