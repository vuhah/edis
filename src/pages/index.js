import MainHome from '@/layouts/home/mainHome'
import HeaderHome from '@/layouts/home/headerHome'
import Head from 'next/head'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Edis - Emergency Disaster Information Service</title>
			</Head>
			<div className="container mx-auto px-24 pt-6">
				<HeaderHome />
				<MainHome />
			</div>
		</div>
		// <div className="container mx-auto px-24 pt-6">
		// 	<HeaderHome />
		// 	<MainHome />
		// </div>
	)
}
