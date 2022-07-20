import { User } from '../model/dto/User.dto'
import { UserUpdateDto } from '../model/dto/UserUpdate.dto'
import { axiosPrivate } from './axios'

const BACKEND_NEWS_PATH = `/users`

export async function getOwnUser() {
  const response = await axiosPrivate.get<User>(`${BACKEND_NEWS_PATH}/own`)

  return response.data
}

export async function updateOwnUser(userUpdate: UserUpdateDto) {
  const response = await axiosPrivate.post<User>(
    `${BACKEND_NEWS_PATH}/own`,
    userUpdate
  )

  return response.data
}
