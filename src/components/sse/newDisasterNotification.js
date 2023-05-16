import { useEffect } from 'react'
import { getAccessToken } from '@/utilities'
import { SSE } from 'sse.js'
import { useDispatch } from 'react-redux'
import { setDisasterTrigger } from '@/redux/notificationsSlices'

export default function SSE_disasterNotification() {
	const dispatch = useDispatch()

	useEffect(() => {
		let url = `${process.env.NEXT_PUBLIC_API_URL}sse/disaster-notification`
		let source = null
		let retryInterval = null
		let retryCount = 0
		const maxRetryCount = 10

		const connectToSSE = () => {
			source = new SSE(url, {
				headers: {
					'Content-Type': 'text/event-stream',
					Authorization: `Bearer ${getAccessToken()}`,
				},
				method: 'GET',
			})

			source.addEventListener('message', (e) => {
				if (e.data !== '[DONE]') {
					dispatch(setDisasterTrigger())
				} else {
					source.close()
					if (retryInterval) {
						clearInterval(retryInterval)
					}
					console.log('SSE connection closed')
				}
			})

			source.addEventListener('error', (error) => {
				console.error('SSE error:', error)
				reconnectToSSE()
			})

			source.stream()
		}

		const reconnectToSSE = () => {
			if (retryCount < maxRetryCount) {
				retryCount++
				console.log(
					`Retrying SSE connection. Attempt ${retryCount} of ${maxRetryCount}`,
				)
				clearInterval(retryInterval)
				retryInterval = setInterval(connectToSSE, 500) // Retry every 5 seconds
			} else {
				console.log(`Maximum retry count reached. SSE connection failed.`)
			}
		}

		connectToSSE()

		return () => {
			if (source) {
				source.close()
			}
			if (retryInterval) {
				clearInterval(retryInterval)
			}
		}
	}, [])

	return null
}
