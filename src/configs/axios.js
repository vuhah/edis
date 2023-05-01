import axios from 'axios'

const axiosInstance = axios.create({
	// withCredentials: true,
	baseURL: 'http://localhost:3001',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
})

export default axiosInstance
