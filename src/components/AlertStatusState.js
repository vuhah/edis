import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function AlertStatusState() {
	const [safetyLocation, setSafetyStatus] = useState(
		useSelector((state) => state.user.safetyLocation),
	)

	if (safetyLocation)
		return (
			<div className="flex items-center justify-between space-x-10 ">
				<Image src="/images/shield.png" alt="shield" width={46} height={46} />
				<p>
					Hi Vu, our system has detected that is still safe and there are no
					signals of any natural disaster happening.
				</p>
			</div>
		)
	else
		return (
			<div className="flex items-center justify-between space-x-10">
				<Image src="/images/warning.png" alt="warning" width={46} height={46} />
				<p>
					We have detected that new disaster is occurring in your location.
					Please be cautious and protect yourself as soon as possible.
				</p>
			</div>
		)
}
