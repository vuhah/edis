import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { mapLocations } from '@/utilities/disasters.util'
import { API_URL } from '@/utilities/host.util'

const Column = dynamic(
	() => import('@ant-design/plots').then(({ Column }) => Column),
	{ ssr: false },
)

const fetcher = (...args) =>
	fetch(...args)
		.then((res) => res.json())
		.then((data) => {
			const mappedData = data.map((item) => {
				return {
					type: mapLocations[item.type].name,
					value: item.value,
				}
			})
			return mappedData
		})

const BarStat = () => {
	const { data, error, isLoading } = useSWR(
		`${API_URL}/statistic/getColumnChart`,
		fetcher,
	)

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>

	const config = {
		data,
		xField: 'type',
		yField: 'value',
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6,
			},
		},
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			type: {
				alias: 'Location',
			},
			value: {
				alias: 'Total Disasters',
			},
		},
		seriesField: 'type',
		columnStyle: {
			radius: [20, 20, 0, 0],
		},
		color: [
			'rgb(255, 99, 132)',
			'rgb(255, 159, 64)',
			'rgb(255, 205, 86)',
			'rgb(75, 192, 192)',
			'rgb(54, 162, 235)',
			'rgb(153, 102, 255)',
		],
	}
	return <Column {...config} />
}

export default BarStat
