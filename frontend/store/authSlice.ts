import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { signIn as signInAPI } from '../api/auth'
import { SignInUserDto } from '../model/dto/SignInUser.dto'
import { AuthTokensDto } from '../model/dto/AuthTokens.dto'

export interface AuthData {
  access_token: string | null
  refresh_token: string | null
}

const initialState: AuthData = {
  access_token: null,
  refresh_token: null,
}

// export const authenticate = createAsyncThunk(
//   'auth/authenticate',
//   async (signInUserDto: SignInUserDto) => {
//     let response
//     try {
//       response = await signInAPI(signInUserDto)
//     } catch (error) {
//       const errorMessage = error.response.data.message
//       throw new Error(errorMessage)
//     }
//     return response
//   }
// )

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<AuthTokensDto>) => {
      const { access_token, refresh_token } = action.payload
      state.access_token = access_token ?? state.access_token
      state.refresh_token = refresh_token ?? state.refresh_token
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(authenticate.pending, (state, action) => {
  //       state.status = 'loading'
  //       state.error = null
  //     })
  //     .addCase(authenticate.fulfilled, (state, action) => {
  //       state.status = 'succeeded'
  //       const { access_token, refresh_token } = action.payload.data
  //       state.access_token = access_token ?? state.access_token
  //       state.refresh_token = refresh_token ?? state.refresh_token
  //     })
  //     .addCase(authenticate.rejected, (state, action) => {
  //       state.status = 'failed'
  //       state.error = action.error.message!
  //     })
  // },
})

export const { setTokens } = authSlice.actions

export default authSlice.reducer
