import axios from 'axios'

import { CreateUserDto } from '../model/dto/CreateUser.dto'
import { ConfirmUserDto } from '../model/dto/ConfirmUser.dto'
import { SignInUserDto } from '../model/dto/SignInUser.dto'
import { AuthTokensDto } from '../model/dto/AuthTokens.dto'
import { UserIdDto } from '../model/dto/UserId.dto'
import { ForgotPasswordDto } from '../model/dto/ForgotPassword.dto'
import { ChangePasswordDto } from '../model/dto/ChangePassword.dto'

const BACKEND_URL = 'http://192.168.178.34:3000'
const BACKEND_AUTH_PATH = `${BACKEND_URL}/auth`

export function signUp(createUser: CreateUserDto) {
  return axios.post<UserIdDto>(`${BACKEND_AUTH_PATH}/sign-up`, createUser)
}

export function confirmUser(confirmUser: ConfirmUserDto) {
  return axios.post<void>(`${BACKEND_AUTH_PATH}/confirm`, confirmUser)
}

export function signIn(signInUser: SignInUserDto) {
  return axios.post<AuthTokensDto>(`${BACKEND_AUTH_PATH}/sign-in`, signInUser)
}

export function renewConfirmationToken(signInUser: SignInUserDto) {
  return axios.post<void>(
    `${BACKEND_AUTH_PATH}/renew-confirmation-token`,
    signInUser
  )
}

export function forgotPassword(forgotPassword: ForgotPasswordDto) {
  return axios.post<void>(
    `${BACKEND_AUTH_PATH}/forgot-password`,
    forgotPassword
  )
}

export function changePassword(changePassword: ChangePasswordDto) {
  return axios.post<void>(
    `${BACKEND_AUTH_PATH}/change-password`,
    changePassword
  )
}
