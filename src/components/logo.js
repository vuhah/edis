import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
	return (
		<Link href="/">
			<Image src="/edis.png" alt="logo" width={52} height={32} className="h-auto"/>
		</Link>
	)
}
