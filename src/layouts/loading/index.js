import Image from 'next/image'

export default function LoadingScreen() {
	return (
		<div className="animate__animated animate__fadeOut animate__delay-2s container flex h-screen items-center justify-center">
			<Image
				className="animate__animated animate__wobble animate__infinite"
				src="/images/logoImage.png"
				alt="Logo"
				width={160}
				height={160}
			/>
		</div>
	)
}

