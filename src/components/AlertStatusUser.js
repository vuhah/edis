import { UpdateSafety } from '@/api'
import { setSafetyStatus } from '@/redux/userSlice'
import { Button, ConfigProvider } from 'antd'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

export default function AlertStatusUser() {
	// const [safetyStatus, seSafetyStatus] = useState(
	// 	useSelector((state) => state.user.safetyStatus),
	// )

	const safetyStatus = useSelector((state) => state.user.safetyStatus)

	const dispatch = useDispatch()

	async function handleClickSafe(e) {
		e.preventDefault()
		dispatch(setSafetyStatus({ safetyStatus: true }))
		try {
			const response = await UpdateSafety({ safetyStatus: true })
			return response
		} catch (error) {
			return error
		}
	}

	async function handleClickDanger(e) {
		e.preventDefault()
		dispatch(setSafetyStatus({ safetyStatus: false }))
		try {
			const response = await UpdateSafety({ safetyStatus: false })
			return response
		} catch (error) {
			return error
		}
	}

	if (safetyStatus)
		return (
			<div className="flex items-center justify-between space-x-10 ">
				<Image src="/images/shield.png" alt="shield" width={46} height={46} />
				<p>Let us know if you are in danger!</p>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#E86A33',
							fontFamily: 'Roboto, san-serif',
						},
					}}
				>
					<Button
						className="h-10 rounded-2xl bg-primary font-medium"
						type="primary"
						onClick={(e) => handleClickDanger(e)}
					>
						I'm in danger
					</Button>
				</ConfigProvider>
			</div>
		)
	else
		return (
			<div className="flex items-center justify-between space-x-10">
				<Image src="/images/warning.png" alt="warning" width={46} height={46} />
				<p>Let us know if you are safe now</p>

				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#4CB14C',
							fontFamily: 'Roboto, san-serif',
						},
					}}
				>
					<Button
						className="h-10  rounded-2xl bg-green font-medium"
						type="primary"
						onClick={(e) => handleClickSafe(e)}
					>
						I'm safe
					</Button>
				</ConfigProvider>
			</div>
		)
}
