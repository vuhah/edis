import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapParamPrepare } from '@/utilities'
import {
	DANGEROUS_LEVEL,
	STATE_NAME,
	STATE_CODE_NAME,
	DISASTER_IMAGES,
	DANGEROUS_LEVEL_NUMS,
} from '@/constant'
import { useSelector, useDispatch } from 'react-redux'
import { setSafetyLocation } from '@/redux/userSlice'

mapboxgl.accessToken =
	'pk.eyJ1IjoidnV1dTA0MTIiLCJhIjoiY2xoOXh6bWVzMGNlcTNzbGd4aXR5aHZibyJ9.OX8F0MJ0CZQv1q31DsCZfw'

export default function MapContainer() {
	const containerRef = useRef(<></>)
	const [map, setMap] = useState(null)

	const userLocation = useSelector((state) => state.user.location)
	const dispatch = useDispatch()

	// dispatch(setSafetyStatus(data[userLocation].disasters ? false : true))

	useEffect(() => {
		if (!map) {
			const newMap = new mapboxgl.Map({
				container: containerRef.current,
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [-95, 39.8283],
				zoom: 3.5,
			})

			const popup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false,
			})

			newMap.on('load', () => {
				newMap.addSource('states', {
					type: 'geojson',
					data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson',
				})

				newMap.addLayer({
					id: 'state-borders',
					type: 'line',
					source: 'states',
					layout: {},
					paint: {
						'line-color': '#E86A33',
						'line-width': 0.5,
					},
				})

				for (let i of STATE_NAME) {
					newMap.addLayer({
						id: i,
						type: 'fill',
						source: {
							type: 'geojson',
							data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson',
						},
						filter: ['==', 'STATE_NAME', i],
						paint: {
							'fill-color': 'rgba(255, 0, 0, 0)',
							'fill-opacity': 0.5,
						},
					})
				}

				const getDataRT = async () => {
					try {
						const dataArray = await mapParamPrepare()

						const userState = dataArray.find(
							(item) => item.name.toString() === STATE_CODE_NAME[userLocation],
						)
						if (userState.maxlevel === 0) {
							dispatch(setSafetyLocation({ safetyLocation: true }))
						} else {
							dispatch(setSafetyLocation({ safetyLocation: false }))
						}

						for (let i of dataArray) {
							newMap.setPaintProperty(
								i.name.toString(),
								'fill-color',
								i.maxlevel === 0
									? 'rgba(0, 0, 0, 0)'
									: DANGEROUS_LEVEL_NUMS[i.maxlevel.toString()].color,
							)

							if (i.maxlevel !== 0) {
								newMap.on('mousemove', i.name.toString(), (e) => {
									if (e.features.length > 0) {
										if (popup) {
											popup.remove()
										}
										const coordinates = e.lngLat

										let hover = ''

										Object.keys(i.disasters).map((disaster) => {
											const imageDisasterIcon = `<Image className="display:inline" width={12} height={12} src=${DISASTER_IMAGES[disaster]} alt="" />`
											hover += `<div className="flex items-center"><span>${imageDisasterIcon}</span> ${
												DANGEROUS_LEVEL_NUMS[i.disasters[disaster].level].name
											}</span> </div>`
										})

										popup
											.setLngLat(coordinates)
											.setHTML(`<div>${hover}</div>`)
											.addTo(newMap)
									}
								})

								// When the mouse leaves the state fill layer, remove the popup.
								newMap.on('mouseleave', i.name.toString(), () => {
									if (popup) {
										popup.remove()
									}
								})
							}
						}
					} catch (error) {
						return []
					}
				}

				const interval = setInterval(() => {
					getDataRT()
				}, 1000 * 12)

				return () => {
					clearInterval(interval)
				}
			})
			setMap(newMap)
		}
		return () => {
			if (map) {
				map.off()
				setMap(null)
			}
		}
	}, [map])

	return <div ref={containerRef} className="h-full w-full rounded-xl" />
}
