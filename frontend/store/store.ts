import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

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

// SOURCE: https://www.angularfix.com/2022/05/why-argument-of-type-void-is-not.html
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
