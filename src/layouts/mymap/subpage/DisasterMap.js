import { MapContainer } from '@/components'
import { Divider } from 'antd'
import { DISASTER_TYPES, DISASTER_IMAGES, DANGEROUS_LEVEL } from '@/constant'
import Image from 'next/image'
import AlertStatusState from '@/components/AlertStatusState'
import AlertStatusUser from '@/components/AlertStatusUser'
// import { useSelector } from 'react-redux'
// import { STATE_CODE_NAME } from '@/constant'
// import { useEffect, useState } from 'react'

export default function DisasterMap() {
	// const [location, setLocation] = useState(
	// 	useSelector((state) => state.user.location),
	// )

	return (
		<div className="flex h-full flex-col space-y-4 px-6 py-4">
			<div className="flex items-center space-x-8">
				<div className="basis-1/2">
					{/* <h1 className=" ps-1 text-sm font-semibold text-default">
						Your location
					</h1> */}
					<div className="rounded-xl border-2 border-primary bg-white p-2 shadow-lg">
						<AlertStatusState />
					</div>
				</div>
				<div className="basis-1/2">
					{/* <h1 className=" text-md ps-1 font-semibold text-default">
						Your safety status
					</h1> */}
					<div className="rounded-xl border-2 border-primary bg-white p-2 shadow-lg">
						<AlertStatusUser />
					</div>
				</div>
			</div>

			<div className="flex w-full grow space-x-8">
				<div className="flex grow flex-col">
					{/* <h1 className=" ps-1 text-sm font-semibold text-default">
						Your safety status
					</h1> */}
					<div className="w-full grow rounded-xl border-2 border-primary bg-white shadow-lg">
						<MapContainer />
					</div>
				</div>

				<div className="flex h-full flex-col">
					{/* <h1 className=" ps-1 text-sm font-extrabold text-default">
						Map Legend
					</h1> */}

					<div className=" flex grow flex-col">
						<div className="basis-1/2 rounded-xl border-2 border-primary bg-white px-4 py-2 shadow-xl">
							<h1 className="">Disaster Type</h1>
							<Divider className="my-3" />
							{DISASTER_TYPES.map((disaster, index) => (
								<div key={index} className="mb-2 flex items-center space-x-4">
									<Image
										src={DISASTER_IMAGES[disaster]}
										alt={disaster}
										width={32}
										height={32}
									/>
									<p className="grow">{disaster}</p>
								</div>
							))}
						</div>

						<div className="mt-4 basis-1/2 rounded-xl border-2 border-primary bg-white px-4 py-2 shadow-xl">
							<h1 className="">Dangerous level</h1>
							<Divider className="my-3" />
							{DANGEROUS_LEVEL.map((level, index) => (
								<div key={index} className="mb-4 flex items-center space-x-4">
									<div
										className="h-5 w-5 rounded-full"
										style={{
											backgroundColor: `${level.color}`,
											opacity: '0.5',
										}}
									></div>
									<p className="grow">{level.name}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
