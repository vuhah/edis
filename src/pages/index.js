import MainHome from '@/layouts/mainHome'
import HeaderHome from '../layouts/headerHome'

export default function Home() {
	return (
		<div className="container mx-auto px-24 pt-6">
			<HeaderHome />
			<MainHome/>
		</div>
	)
}
