import React from 'react'
import { Button, Card, Tooltip } from 'antd'
import Link from 'next/link'

const Layout = ({ children }) => {
	return (
		<main className="bg-slate-100 mx-auto min-h-screen">
			<div className="flex flex-wrap justify-center">
				<nav className="border-r-edis left-0 top-0 flex min-h-screen w-1/12 justify-around bg-white drop-shadow-md">
					<div className="mt-14 flex flex-col align-middle">
						<div className="flex justify-center">
							<a
								href="/"
								className="text-edis hover:text-edis text-center text-4xl font-bold"
							>
								edis
							</a>
						</div>
						<div className="mt-12">
							<Tooltip
								title="Home"
								placement="right"
								mouseLeaveDelay={0}
								mouseEnterDelay={0}
								defaultOpen={false}
								destroyTooltipOnHide={true}
							>
								<Link
									href="/"
									className="text-black hover:text-edis hover:bg-slate-100 flex justify-center rounded-lg py-3 text-center font-medium text-opacity-90 hover:shadow-md"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className=" h-6 w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
										/>
									</svg>
								</Link>
							</Tooltip>
							<Tooltip
								title="Disasters"
								placement="right"
								mouseLeaveDelay={0}
								mouseEnterDelay={0.1}
								defaultOpen={false}
								destroyTooltipOnHide={true}
								popupVisible={false}
							>
								<Link
									href="/disasters"
									className="text-black hover:text-edis hover:bg-slate-100 flex justify-center rounded-lg py-3 text-center font-medium text-opacity-90 hover:shadow-md"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-6 w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
										/>
									</svg>
								</Link>
							</Tooltip>
						</div>
					</div>
				</nav>

				<div className="mt-14 w-11/12">
					<div className="flex justify-start">
						<p className="w-12"></p>
						<h2 className="mb-14 w-11/12 text-4xl font-bold">
							Disasters Statistics Dashboard
						</h2>
					</div>
					{children}
				</div>
			</div>
		</main>
	)
}

export default Layout
