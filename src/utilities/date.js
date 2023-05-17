export const formatDate = (dateTimeString) => {
	const date = new Date(dateTimeString)
	const currentTime = new Date()

	const formattedTime = date.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})

	if (
		date.getDate() === currentTime.getDate() &&
		date.getMonth() === currentTime.getMonth() &&
		date.getFullYear() === currentTime.getFullYear()
	) {
		// The date is today
		return `${formattedTime}, Today`
	} else if (
		date.getDate() === currentTime.getDate() - 1 &&
		date.getMonth() === currentTime.getMonth() &&
		date.getFullYear() === currentTime.getFullYear()
	) {
		// The date is yesterday
		return `${formattedTime}, Yesterday`
	} else {
		// The date is before yesterday
		const formattedDate = date.toLocaleDateString([], {
			day: '2-digit',
			month: 'short',
		})
		return formattedDate
	}
}
