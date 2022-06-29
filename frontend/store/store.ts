import { configureStore } from '@reduxjs/toolkit'

import registrationReducer, { RegistrationData } from './registrationSlice'

export interface StoreReducer {
  registration: RegistrationData
}

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
})
