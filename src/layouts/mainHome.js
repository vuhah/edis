import Image from 'next/image'
import Link from 'next/link'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import ButtonProps from '@/components/button'

export default function MainHome() {
	return (
		<div className="">
			<div className="mt-20 flex flex-row items-center justify-between">
				<AnimationOnScroll
					animateIn="animate__backInLeft"
					className="animate__animated animate__backInLeft"
				>
					<h1 className="text-4xl font-semibold">
						Emergency Disaster <br /> Information Service
					</h1>
					<p className="mt-4 text-sm">
						We help you to know if you and your friends are currently affected
						by natural disasters by collecting and processing millions of
						Twitter posts.
					</p>
					<div className="mt-6 ">
						<Link
							className="text-sm font-semibold hover:text-primary hover:underline"
							href="/mymap"
						>
							<ButtonProps
								props={{ type: 'primary', content: 'Go to dashboard' }}
							/>
						</Link>
					</div>
				</AnimationOnScroll>
				<AnimationOnScroll
					animateIn="animate__backInRight"
					className="animate__animated animate__backInRight"
				>
					<Image
						className="animate__animated animate__backInDown animate__delay-0.5s"
						src={'/images/thumbnail.png'}
						alt="thumbnail"
						width={1050}
						height={400}
					/>
				</AnimationOnScroll>
			</div>
			<div className="mt-12 pt-16" id="about">
				<div>
					<div className="flex items-center">
						<AnimationOnScroll
							animateIn="animate__fadeInDown"
							className="w-3/5"
						>
							<Image
								src={'/images/thumnail1.svg'}
								alt="About us"
								width={600}
								height={1050}
							/>
						</AnimationOnScroll>
						<AnimationOnScroll
							animateIn="animate__fadeInDown"
							className="basis-1/3"
						>
							<p className="text-sm font-semibold text-primary">About</p>
							<h1 className="text-3xl font-bold">
								Emergency alert dangerous locations
							</h1>
							<p className="mt-8 text-sm">
								We provide you with accurate real-time information. And if
								unfortunately the area you live in is in danger, we will notify
								you immediately with an emergency warning.
							</p>
						</AnimationOnScroll>
					</div>
					<div className="flex items-center justify-between">
						<AnimationOnScroll
							animateIn="animate__fadeInDown"
							className="basis-2/5"
						>
							<h1 className="text-3xl font-bold">
								Check the safety of your friends
							</h1>
							<p className="mt-8 text-sm">
								Updating the safety status of your loved ones and friends in
								disaster-stricken areas has never been easier with Edis
							</p>
						</AnimationOnScroll>
						<AnimationOnScroll animateIn="animate__bounceIn">
							<Image
								src={'/images/thumnail1.svg'}
								alt="About us"
								width={600}
								height={1050}
							/>
						</AnimationOnScroll>
					</div>
				</div>
			</div>

			<div className="mt-24 pt-20" id="work">
				<AnimationOnScroll
					animateIn="animate__fadeInDown"
					className=" flex flex-col items-center justify-between"
				>
					<p className="text-sm font-semibold text-primary">Work</p>
					<h1 className="text-3xl font-bold">How our system work?</h1>
					<p className="mt-2 w-2/5 text-center text-sm">
						We collect all Twitter posts related to natural disasters, process
						the big data, and make predictions about the places that are
						affected by natural disasters across the United States.
					</p>
					<div className="mt-28 flex w-screen flex-row items-center justify-around">
						<div className="">
							<Image
								src={'/images/birds.png'}
								alt="birds"
								width={260}
								height={260}
							/>
						</div>
						<div className="">
							<Image
								src={'/images/thumbnail3.svg'}
								alt="birds"
								width={260}
								height={260}
							/>
						</div>
						<div className="">
							<Image
								src={'/images/thumbnail4.svg'}
								alt="birds"
								width={260}
								height={260}
							/>
						</div>
					</div>
				</AnimationOnScroll>
			</div>

			<div className="mt-12 pb-40 pt-24" id="join">
				<AnimationOnScroll
					animateIn="animate__backInUp"
					className="flex flex-col items-center justify-center"
				>
					<p className="text-sm font-semibold text-primary">Join</p>
					<h1 className="text-3xl font-bold">Join our community</h1>
					<p className="mb-6 mt-2 w-1/3 text-center text-sm">
						Join our community on Telegram to stay up-to-date with the latest
						news on natural disasters
					</p>
					<ButtonProps props={{ type: 'primary', content: 'Open Telegram' }} />
				</AnimationOnScroll>
			</div>
		</div>
	)
}
