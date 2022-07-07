const axios = require('axios')
import { store } from '../store/store'

const axiosAuth = axios.create()

// Request interceptor for API calls
axiosAuth.interceptors.request.use(
  async (config) => {
    const token = store.getState().auth.access_token
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export { axiosAuth }
