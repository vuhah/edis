import Image from 'next/image'
import { useRouter } from 'next/router'

export function Logo({ props }) {
	const router = useRouter()
	function handleRouter(e) {
		e.preventDefault()
		router.push('/')
	}
	return (
		<Image
			onClick={(e) => handleRouter(e)}
			src="/images/logoImage.png"
			alt="Logo image"
			height={props.size}
			width={props.size}
		/>
	)
}

export function Brand({ props }) {
	const router = useRouter()
	function handleRouter(e) {
		e.preventDefault()
		router.push('/')
	}
	return (
		<div onClick={(e) => handleRouter(e)}>
			<h1>edis</h1>
		</div>
	)
}

export function LogoWithBrandHorizontal({ props }) {
	const router = useRouter()
	function handleRouter(e) {
		e.preventDefault()
		router.push('/')
	}
	return (
		<div className="flex items-center" onClick={(e) => handleRouter(e)}>
			<Image
				src="/images/logoImage.png"
				alt="Logo image"
				height={props.size}
				width={props.size}
			/>
			<h1 className=" ms-3 text-lg font-extrabold text-primary">edis</h1>
		</div>
	)
}

export function LogoWithBrandVertical({ props }) {
	const router = useRouter()
	function handleRouter(e) {
		e.preventDefault()
		router.push('/')
	}
	return (
		<div
			className="flex flex-col items-center justify-center"
			onClick={(e) => handleRouter(e)}
		>
			<Image
				src="/images/logoImage.png"
				alt="Logo image"
				height={46}
				width={46}
			/>
			<h1 className=" text-xl font-extrabold text-primary">edis</h1>
		</div>
	)
}
