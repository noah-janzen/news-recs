import { CreateUserDto } from '../model/dto/CreateUser.dto'
import { ConfirmUserDto } from '../model/dto/ConfirmUser.dto'
import { SignInUserDto } from '../model/dto/SignInUser.dto'
import { AuthTokensDto } from '../model/dto/AuthTokens.dto'
import { UserIdDto } from '../model/dto/UserId.dto'
import { ForgotPasswordDto } from '../model/dto/ForgotPassword.dto'
import { ChangePasswordDto } from '../model/dto/ChangePassword.dto'
import { axiosPublic, axiosPrivate, axiosRefresh } from './axios'

const BACKEND_AUTH_PATH = `/auth`

export function signUp(createUser: CreateUserDto) {
  return axiosPublic.post<UserIdDto>(`${BACKEND_AUTH_PATH}/sign-up`, createUser)
}

export function confirmUser(confirmUser: ConfirmUserDto) {
  return axiosPublic.post<void>(`${BACKEND_AUTH_PATH}/confirm`, confirmUser)
}

export function signIn(signInUser: SignInUserDto) {
  return axiosPublic.post<AuthTokensDto>(
    `${BACKEND_AUTH_PATH}/sign-in`,
    signInUser
  )
}

export function renewConfirmationToken(signInUser: SignInUserDto) {
  return axiosPublic.post<void>(
    `${BACKEND_AUTH_PATH}/renew-confirmation-token`,
    signInUser
  )
}

export function forgotPassword(forgotPassword: ForgotPasswordDto) {
  return axiosPublic.post<void>(
    `${BACKEND_AUTH_PATH}/forgot-password`,
    forgotPassword
  )
}

export function changePassword(changePassword: ChangePasswordDto) {
  return axiosPublic.post<void>(
    `${BACKEND_AUTH_PATH}/change-password`,
    changePassword
  )
}

export function logout() {
  return axiosPrivate.post<void>(`${BACKEND_AUTH_PATH}/logout`)
}

export async function refreshTokens() {
  return axiosRefresh.post<AuthTokensDto>(`${BACKEND_AUTH_PATH}/refresh`)
}
