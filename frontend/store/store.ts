import { configureStore } from '@reduxjs/toolkit'

import registrationReducer, { RegistrationData } from './registrationSlice'
import authReducer, { AuthData } from './authSlice'
import interactionsReducer, { InteractionsData } from './interactionsSlice'

export interface StoreReducer {
  registration: RegistrationData
  auth: AuthData
  interactions: InteractionsData
}

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    interactions: interactionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
