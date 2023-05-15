import { useEffect } from 'react'
import { getAccessToken } from '@/utilities'
import { SSE } from 'sse.js'
import { setNewNotification } from '@/redux/notificationSlice'
import { useDispatch } from 'react-redux'

export default function SSE_disasterNotification() {
	const dispatch = useDispatch()

	useEffect(() => {
		let url = `${process.env.NEXT_PUBLIC_API_URL}sse/disaster-notification`

		let source = new SSE(url, {
			headers: {
				'Content-Type': 'text/event-stream',
				Authorization: `Bearer ${getAccessToken()}`,
			},
			method: 'GET',
		})

		source.addEventListener('message', (e) => {
			if (e.data !== '[DONE]') {
				dispatch(
					setNewNotification({
						data: JSON.parse(e.data),
					}),
				)
			} else {
				source.close()
			}
		})
		source.stream()
	}, [])

	return null
}
