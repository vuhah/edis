import { Map } from '@/api'

export const mapParamPrepare = async () => {
	try {
		const data = await Map()

		const statesWithDisasters = Object.entries(data)
			.filter(([_, state]) => Object.keys(state.disasters).length > 0)
			.reduce((obj, [stateCode, stateData]) => {
				obj[stateCode] = stateData
				return obj
			}, {})

		const result = []

		for (const stateCode in statesWithDisasters) {
			const state = statesWithDisasters[stateCode]
			let maxLevel = -Infinity
			for (const disasterName in state.disasters) {
				const disaster = state.disasters[disasterName]
				if (disaster.level > maxLevel) {
					maxLevel = disaster.level
				}
			}
			result.push({
				name: state.name,
				maxlevel: maxLevel,
				disasters: state.disasters,
			})
		}

		return result
	} catch (error) {
		return []
	}
}

export const randomCoordinate = [
	{
		name: 'Alabama',
		coordinate: [
			Math.random() * (-84.9 + 88.5) - 88.5,
			Math.random() * (35.0 - 30.2) + 30.2,
		],
	},
	{
		name: 'Alaska',
		coordinate: [
			Math.random() * (-147.5 + 179.5) - 179.5,
			Math.random() * (71.5 - 51.3) + 51.3,
		],
	},
	{
		name: 'Arizona',
		coordinate: [
			Math.random() * (-109.1 + 114.8) - 114.8,
			Math.random() * (37.0 - 31.3) + 31.3,
		],
	},
	{
		name: 'Arkansas',
		coordinate: [
			Math.random() * (-94.6 + 91.6) - 91.6,
			Math.random() * (36.5 - 33.0) + 33.0,
		],
	},
	{
		name: 'California',
		coordinate: [
			Math.random() * (-124.5 + 114.5) - 114.5,
			Math.random() * (42.0 - 32.5) + 32.5,
		],
	},
	{
		name: 'Colorado',
		coordinate: [
			Math.random() * (-109.1 + 102.6) - 102.6,
			Math.random() * (41.0 - 36.9) + 36.9,
		],
	},
	{
		name: 'Connecticut',
		coordinate: [
			Math.random() * (-73.2 + 73.7) - 73.7,
			Math.random() * (42.1 - 40.9) + 40.9,
		],
	},
	{
		name: 'Delaware',
		coordinate: [
			Math.random() * (-75.8 + 75.6) - 75.6,
			Math.random() * (39.8 - 38.4) + 38.4,
		],
	},
	{
		name: 'Florida',
		coordinate: [
			Math.random() * (-82.0 + 80.0) - 80.0,
			Math.random() * (31.0 - 24.5) + 24.5,
		],
	},
	{
		name: 'Georgia',
		coordinate: [
			Math.random() * (-85.5 + 84.3) - 84.3,
			Math.random() * (34.9 - 30.4) + 30.4,
		],
	},
	{
		name: 'Hawaii',
		coordinate: [
			Math.random() * (-160.1 + 154.8) - 154.8,
			Math.random() * (22.0 - 18.9) + 18.9,
		],
	},
	{
		name: 'Idaho',
		coordinate: [
			Math.random() * (-117.0 + 117.3) - 117.3,
			Math.random() * (49.0 - 41.9) + 41.9,
		],
	},
	{
		name: 'Illinois',
		coordinate: [
			Math.random() * (-91.5 + 91.5) - 91.5,
			Math.random() * (42.5 - 37.1) + 37.1,
		],
	},
	{
		name: 'Indiana',
		coordinate: [
			Math.random() * (-88.0 + 86.4) - 86.4,
			Math.random() * (41.7 - 37.8) + 37.8,
		],
	},
	{
		name: 'Iowa',
		coordinate: [
			Math.random() * (-96.6 + 96.6) - 96.6,
			Math.random() * (43.5 - 40.4) + 40.4,
		],
	},
	{
		name: 'Kansas',
		coordinate: [
			Math.random() * (-102.1 + 102.1) - 102.1,
			Math.random() * (40.0 - 36.9) + 36.9,
		],
	},
	{
		name: 'Kentucky',
		coordinate: [
			Math.random() * (-89.5 + 82.5) - 82.5,
			Math.random() * (39.0 - 36.5) + 36.5,
		],
	},
	{
		name: 'Louisiana',
		coordinate: [
			Math.random() * (-93.5 + 93.5) - 93.5,
			Math.random() * (31.0 - 28.9) + 28.9,
		],
	},
	{
		name: 'Maine',
		coordinate: [
			Math.random() * (-71.1 + 70.7) - 70.7,
			Math.random() * (47.5 - 43.0) + 43.0,
		],
	},
	{
		name: 'Maryland',
		coordinate: [
			Math.random() * (-79.5 + 75.0) - 75.0,
			Math.random() * (39.7 - 38.0) + 38.0,
		],
	},
	{
		name: 'Massachusetts',
		coordinate: [
			Math.random() * (-73.5 + 73.5) - 73.5,
			Math.random() * (42.5 - 41.1) + 41.1,
		],
	},
	{
		name: 'Michigan',
		coordinate: [
			Math.random() * (-90.5 + 90.5) - 90.5,
			Math.random() * (48.2 - 41.7) + 41.7,
		],
	},
	{
		name: 'Minnesota',
		coordinate: [
			Math.random() * (-97.2 + 97.2) - 97.2,
			Math.random() * (49.4 - 43.5) + 43.5,
		],
	},
	{
		name: 'Mississippi',
		coordinate: [
			Math.random() * (-91.6 + 88.6) - 88.6,
			Math.random() * (34.9 - 30.2) + 30.2,
		],
	},
	{
		name: 'Missouri',
		coordinate: [
			Math.random() * (-95.7 + 91.7) - 91.7,
			Math.random() * (40.6 - 35.9) + 35.9,
		],
	},
	{
		name: 'Montana',
		coordinate: [
			Math.random() * (-116.0 + 116.0) - 116.0,
			Math.random() * (49.0 - 44.4) + 44.4,
		],
	},
	{
		name: 'Nebraska',
		coordinate: [
			Math.random() * (-104.1 + 104.1) - 104.1,
			Math.random() * (43.0 - 40.0) + 40.0,
		],
	},
	{
		name: 'Nevada',
		coordinate: [
			Math.random() * (-120.0 + 120.0) - 120.0,
			Math.random() * (42.0 - 35.0) + 35.0,
		],
	},
	{
		name: 'New Hampshire',
		coordinate: [
			Math.random() * (-72.3 + 72.3) - 72.3,
			Math.random() * (45.3 - 42.7) + 42.7,
		],
	},
	{
		name: 'New Jersey',
		coordinate: [
			Math.random() * (-75.6 + 74.4) - 74.4,
			Math.random() * (41.4 - 38.9) + 38.9,
		],
	},
	{
		name: 'New Mexico',
		coordinate: [
			Math.random() * (-109.1 + 109.1) - 109.1,
			Math.random() * (37.0 - 31.3) + 31.3,
		],
	},
	{
		name: 'New York',
		coordinate: [
			Math.random() * (-79.8 + 79.8) - 79.8,
			Math.random() * (45.0 - 40.5) + 40.5,
		],
	},
	{
		name: 'North Carolina',
		coordinate: [
			Math.random() * (-84.3 + 83.3) - 83.3,
			Math.random() * (36.6 - 33.8) + 33.8,
		],
	},
	{
		name: 'North Dakota',
		coordinate: [
			Math.random() * (-104.0 + 104.0) - 104.0,
			Math.random() * (49.0 - 45.9) + 45.9,
		],
	},
	{
		name: 'Ohio',
		coordinate: [
			Math.random() * (-84.8 + 84.8) - 84.8,
			Math.random() * (42.3 - 38.4) + 38.4,
		],
	},
	{
		name: 'Oklahoma',
		coordinate: [
			Math.random() * (-103.0 + 103.0) - 103.0,
			Math.random() * (37.0 - 33.6) + 33.6,
		],
	},
	{
		name: 'Oregon',
		coordinate: [
			Math.random() * (-124.6 + 124.0) - 124.0,
			Math.random() * (46.3 - 41.9) + 41.9,
		],
	},
	{
		name: 'Pennsylvania',
		coordinate: [
			Math.random() * (-80.5 + 80.5) - 80.5,
			Math.random() * (42.3 - 39.7) + 39.7,
		],
	},
	{
		name: 'Rhode Island',
		coordinate: [
			Math.random() * (-71.6 + 71.6) - 71.6,
			Math.random() * (42.1 - 41.1) + 41.1,
		],
	},
	{
		name: 'South Carolina',
		coordinate: [
			Math.random() * (-83.3 + 83.3) - 83.3,
			Math.random() * (33.9 - 32.0) + 32.0,
		],
	},
	{
		name: 'South Dakota',
		coordinate: [
			Math.random() * (-104.6 + 104.6) - 104.6,
			Math.random() * (45.9 - 42.5) + 42.5,
		],
	},
	{
		name: 'Tennessee',
		coordinate: [
			Math.random() * (-90.3 + 90.3) - 90.3,
			Math.random() * (36.5 - 34.9) + 34.9,
		],
	},
	{
		name: 'Texas',
		coordinate: [
			Math.random() * (-106.6 + 106.6) - 106.6,
			Math.random() * (36.5 - 25.8) + 25.8,
		],
	},
	{
		name: 'Utah',
		coordinate: [
			Math.random() * (-114.0 + 114.0) - 114.0,
			Math.random() * (42.0 - 36.9) + 36.9,
		],
	},
	{
		name: 'Vermont',
		coordinate: [
			Math.random() * (-73.4 + 73.4) - 73.4,
			Math.random() * (45.0 - 42.7) + 42.7,
		],
	},
	{
		name: 'Virginia',
		coordinate: [
			Math.random() * (-83.7 + 75.5) - 75.5,
			Math.random() * (39.5 - 36.5) + 36.5,
		],
	},
	{
		name: 'Washington',
		coordinate: [
			Math.random() * (-124.8 + 124.8) - 124.8,
			Math.random() * (49.0 - 45.5) + 45.5,
		],
	},
	{
		name: 'West Virginia',
		coordinate: [
			Math.random() * (-82.6 + 82.6) - 82.6,
			Math.random() * (40.7 - 37.2) + 37.2,
		],
	},
	{
		name: 'Wisconsin',
		coordinate: [
			Math.random() * (-92.9 + 92.9) - 92.9,
			Math.random() * (47.3 - 42.5) + 42.5,
		],
	},
	{
		name: 'Wyoming',
		coordinate: [
			Math.random() * (-111.0 + 111.0) - 111.0,
			Math.random() * (45.0 - 41.0) + 41.0,
		],
	},
]
