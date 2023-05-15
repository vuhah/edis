import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingScreen from '@/layouts/loading'
import Head from 'next/head'

export default function App({ Component, pageProps: { ...pageProps } }) {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const handleStart = () => {
			setIsLoading(true)
		}
		const handleComplete = () => {
			setIsLoading(false)
		}

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleComplete)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
		}
	}, [router])

	return (
		<Provider store={store}>
			<Head>
				<link rel="icon" href="/images/logoImage.png" />
			</Head>
			{isLoading ? (
				<div>
					<LoadingScreen />
				</div>
			) : (
				<Component {...pageProps} />
			)}{' '}
		</Provider>
	)
}
