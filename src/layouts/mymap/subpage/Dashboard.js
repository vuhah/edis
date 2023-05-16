import PieStat from '@/components/dashboard/PieStat'
import BarStat from '@/components/dashboard/BarStat'
import LineStat from '@/components/dashboard/LineStat'
import Layout from '@/components/dashboard/Layout'
import React, { useState } from 'react'
import { Card, Select } from 'antd'
import { mapLocations } from '@/utilities/disasters.util'

const locationSelections = () => {
	const arr = []
	arr.push({
		label: 'All states',
		value: 'USA',
	})
	Object.keys(mapLocations).forEach((key) => {
		arr.push({
			label: mapLocations[key].name,
			value: key,
		})
	})
	return arr
}

const disasterTypeSelections = () => {
	return [
		{
			label: 'All types',
			value: 'All',
		},
		{
			label: 'Fire',
			value: 'Fire',
		},
		{
			label: 'Flood',
			value: 'Flood',
		},
		{
			label: 'Storm',
			value: 'Storm',
		},
		{
			label: 'Earthquake',
			value: 'Earthquake',
		},
		{
			label: 'Tornado',
			value: 'Tornado',
		},
	]
}

export default function Dashboard() {
	const [locationValue, setLocationValue] = useState('USA')
	const [disasterTypeValue, setDisasterTypeValue] = useState('All')

	const onLocationChange = (data) => {
		setLocationValue(data)
	}

	const onLocationSearch = (data) => {
		console.log('search', data)
	}

	const onDisasterChange = (data) => {
		setDisasterTypeValue(data)
	}

	const onDisasterSearch = (data) => {
		console.log('search', data)
	}
	return (
		<Layout>
			<div className="flex flex-wrap justify-evenly gap-x-10">
				<Card
					bordered={true}
					title="Distribution of Disaster Types"
					className="font-headings border-edis rounded-xl bg-white text-center text-lg font-medium shadow-md"
					style={{ borderWidth: 1, minWidth: '41%' }}
				>
					<Select
						allowClear
						showSearch
						placeholder="Select a location"
						optionFilterProp="children"
						onChange={onLocationChange}
						onSearch={onLocationSearch}
						filterOption={(input, option) =>
							(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
						}
						options={locationSelections()}
						title="Select a location"
						style={{
							borderRadius: 10,
						}}
						popupClassName="rounded-xl"
					/>
					<PieStat location={locationValue} />
				</Card>
				<Card
					bordered={true}
					title="Top 6 states with the highest number of disasters"
					className="font-headings border-edis rounded-xl bg-white pb-2 text-center text-lg font-medium shadow-md"
					style={{ borderWidth: 1, minWidth: '44%' }}
				>
					<BarStat />
				</Card>
			</div>

			<div className="mb-28 mt-20 flex flex-wrap justify-center">
				<div className="w-11/12">
					<Card
						bordered={true}
						title="Total disasters over time"
						className="font-headings border-edis rounded-xl bg-white pb-10 text-center text-lg font-medium shadow-md"
						style={{ borderWidth: 1 }}
					>
						<Select
							allowClear
							showSearch
							placeholder="Select a disaster type"
							optionFilterProp="children"
							onChange={onDisasterChange}
							onSearch={onDisasterSearch}
							filterOption={(input, option) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							options={disasterTypeSelections()}
							popupClassName="rounded-xl"
						/>
						<LineStat type={disasterTypeValue} />
					</Card>
				</div>
			</div>
		</Layout>
	)
}
