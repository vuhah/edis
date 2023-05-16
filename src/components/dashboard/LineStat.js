import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { API_URL } from '@/utilities/host.util'

const Line = dynamic(
	() => import('@ant-design/plots').then(({ Line }) => Line),
	{ ssr: false },
)
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const LineStat = ({ type }) => {
	const { data, error, isLoading, isValidating } = useSWR(
		`${API_URL}/statistic/getLineChart?type=${type}`,
		fetcher,
		{
			revalidateOnFocus: true,
		},
	)

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>
	if (isValidating) return <div>Refreshing data...</div>

	const config = {
		autoFit: true,
		data: data,
		xField: 'time',
		yField: 'value',
		point: {
			size: 10,
			shape: 'round',
			style: {
				fill: 'white',
				stroke: '#E86A33',
			},
		},
		tooltip: {
			showMarkers: false,
		},
		state: {
			active: {
				animate: { duration: 100, easing: 'easeLinear' },
				style: {
					shadowBlur: 4,
				},
			},
		},
		interactions: [
			{
				type: 'marker-active',
			},
		],
		color: '#FF8C5A',
	}
	return <Line {...config} />
}

export default LineStat
