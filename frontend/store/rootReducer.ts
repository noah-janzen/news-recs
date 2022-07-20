import createSecureStore from 'redux-persist-expo-securestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import registrationReducer, { RegistrationData } from './registrationSlice'
import authReducer, { AuthData } from './authSlice'
import interactionsReducer, { InteractionsData } from './interactionsSlice'

export interface StoreReducer {
  registration: RegistrationData
  interactions: InteractionsData
  auth: AuthData
}

// Secure storage
const secureStorage = createSecureStore()
const securePersistConfig = {
  key: 'secure',
  storage: secureStorage,
}

// Non-secure (AsyncStorage) storage
const mainPersistsConfig = {
  key: 'main',
  storage: AsyncStorage,
}

// Combine them together
export const rootReducer = combineReducers({
  registration: registrationReducer,
  interactions: interactionsReducer,
  auth: persistReducer(securePersistConfig, authReducer),
})
