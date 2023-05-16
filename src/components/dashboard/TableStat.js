import React, { useState } from 'react'
import { mapLocations, levelMap, DANGEROUS_LEVEL } from '@/utilities/disasters.util'
import { Pagination, Table, Tag } from 'antd'
import useSWR from 'swr'
import { API_URL } from '@/utilities/host.util'

const fetcher = (...args) =>
	fetch(...args)
		.then((res) => res.json())
		.then((data) => {
			const mappedData = data.map((item) => {
				return {
					...item,
					key: item.id,
					startTime: new Date(item.startTime).toUTCString(),
					location: mapLocations[item.location].name,
					level: levelMap[item.level],
				}
			})
			return mappedData
		})

const locationFilter = () => {
	const arr = []
	Object.keys(mapLocations).forEach((key) => {
		arr.push({
			text: mapLocations[key].name,
			value: mapLocations[key].name,
		})
	})
	return arr
}

const levelFilter = () => {
	const arr = []
	Object.keys(levelMap).forEach((key) => {
		arr.push({
			text: levelMap[key],
			value: levelMap[key],
		})
	})
	return arr
}

const columns = [
	{
		title: 'Location',
		dataIndex: 'location',
		key: 'location',
		filters: locationFilter(),
		onFilter: (value, record) => record.location.indexOf(value) === 0,
		// defaultSortOrder: 'ascend',
		sorter: (a, b) => {
			const nameA = a.location.toUpperCase() // ignore upper and lowercase
			const nameB = b.location.toUpperCase() // ignore upper and lowercase
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}

			// names must be equal
			return 0
		},
	},
	{
		title: 'Severity level',
		dataIndex: 'level',
		key: 'level',
		filters: levelFilter(),
		onFilter: (value, record) => record.level.indexOf(value) === 0,
		// defaultSortOrder: 'ascend',
		sorter: (a, b) => a.level - b.level,
	},
	{
		title: 'Disaster type',
		dataIndex: 'type',
		key: 'type',
		render: (type) => (
			<>
				{type === 'Fire' ? (
					<span className="text-red-700">🔥 Fire</span>
				) : type === 'Flood' ? (
					<span className="text-blue-700">🌊 Flood</span>
				) : type === 'Storm' ? (
					<span className="text-cyan-700">⛈ Storm</span>
				) : type === 'Earthquake' ? (
					<span className="text-amber-600">🔸 Earthquake</span>
				) : type === 'Tornado' ? (
					<span className="text-violet-700">🌪 Tornado</span>
				) : (
					<span></span>
				)}
			</>
		),
		filters: [
			{
				text: 'Fire',
				value: 'Fire',
			},
			{
				text: 'Flood',
				value: 'Flood',
			},
			{
				text: 'Storm',
				value: 'Storm',
			},
			{
				text: 'Earthquake',
				value: 'Earthquake',
			},
			{
				text: 'Tornado',
				value: 'Tornado',
			},
		],
		onFilter: (value, record) => record.type.indexOf(value) === 0,
	},
	{
		title: 'Related tweets count',
		dataIndex: 'tweetCount',
		key: 'tweetCount',
		// defaultSortOrder: 'ascend',
		sorter: (a, b) => a.tweetCount - b.tweetCount,
	},
	{
		title: 'Status',
		dataIndex: 'isActive',
		key: 'isActive',
		render: (active) => (
			<>
				{active ? (
					<Tag color="volcano">Ongoing</Tag>
				) : (
					<Tag color="green">Stopped</Tag>
				)}
			</>
		),
		filters: [
			{
				text: 'Ongoing',
				value: true,
			},
			{
				text: 'Stopped',
				value: false,
			},
		],
		onFilter: (value, record) => record.isActive === value,
	},
	{
		title: 'Start date',
		dataIndex: 'startTime',
		key: 'startTime',
		defaultSortOrder: 'descend',
		sorter: (a, b) => new Date(a.startTime) - new Date(b.startTime),
	},
]

const TableStat = () => {
	const { data, error, isLoading } = useSWR(
		`${API_URL}/statistic/getTable?page=1&limit=50`,
		fetcher,
		{
			refreshInterval: 1000 * 60 * 5,
		},
	)

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>

	const onChange = (pagination, filters, sorter, extra) => {
		// console.log('filter', filters)
		// console.log('params', pagination, filters, sorter, extra);
	}

	const tablPage = () => {
		return (
			<Pagination
				defaultCurrent={1}
				total={50}
				className="focus:border-edis focus-within:border-edis hover:border-edis rounded-xl"
			/>
		)
	}

	return (
		<>
			<Table
				className="font-primary"
				columns={columns}
				dataSource={data}
				pagination={tablPage}
				onChange={onChange}
			/>
		</>
	)
}

export default TableStat
