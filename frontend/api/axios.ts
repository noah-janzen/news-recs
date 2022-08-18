import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { BACKEND_URL } from '@env'
import { store } from '../store/store'
import { refreshTokens } from '../store/authSlice'

const axiosPublic = axios.create({
  baseURL: BACKEND_URL,
})
const axiosPrivate = axios.create({
  baseURL: BACKEND_URL,
})
const axiosRefresh = axios.create({
  baseURL: BACKEND_URL,
})

axiosPrivate.interceptors.request.use(
  async (config) => {
    let accessToken = store?.getState()?.auth?.tokens?.access_token
    if (!accessToken) return config

    const currentDate = new Date()
    const decodedToken: { exp: number } = jwt_decode(accessToken)
    // TODO: consider some amount of time for performing the request (e. g. 15 seconds)
    // and update if condition below
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      await store.dispatch(refreshTokens())
    }
    if (config?.headers) {
      accessToken = store?.getState()?.auth?.tokens?.access_token
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Request interceptor for API calls
axiosRefresh.interceptors.request.use(
  async (config) => {
    const refreshToken = store?.getState()?.auth?.tokens?.refresh_token
    if (config?.headers) {
      config.headers.Authorization = `Bearer ${refreshToken}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export { axiosPublic, axiosPrivate, axiosRefresh }
