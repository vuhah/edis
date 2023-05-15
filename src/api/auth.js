import axiosInstance from '@/configs/axios'

export const Login = async (email, password) => {
	try {
		const response = await axiosInstance.post('auth/login', {
			email: email,
			password: password,
		})
		return response
	} catch (error) {
		console.log(error)
	}
}

export const LoginGoogle = async () => {
	try {
		const response = await axiosInstance.get('auth/login/google')
		return response
	} catch (error) {
		throw new Error('Invalid email or password')
	}
}
