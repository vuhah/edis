import { GetUserList } from '@/api'

export const getListEmailUser = async () => {
	const listUser = await GetUserList()
	const listEmail = listUser.map((user) => user.email)
	return listEmail
}
