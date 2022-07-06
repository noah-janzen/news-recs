import { configureStore } from '@reduxjs/toolkit'

import registrationReducer, { RegistrationData } from './registrationSlice'
import authReducer, { AuthData } from './authSlice'

export interface StoreReducer {
  registration: RegistrationData
  auth: AuthData
}

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
