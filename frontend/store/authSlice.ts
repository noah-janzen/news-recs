import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  signIn as signInAPI,
  refreshTokens as refreshTokensAPI,
} from '../api/auth'
import { SignInUserDto } from '../model/dto/SignInUser.dto'

export interface AuthData {
  tokens: {
    access_token: string | null
    refresh_token: string | null
  }
  authentication: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
  }
  refresh: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
  }
}

const initialState: AuthData = {
  tokens: {
    access_token: null,
    refresh_token: null,
  },
  authentication: {
    status: 'idle',
    error: null,
  },
  refresh: {
    status: 'idle',
    error: null,
  },
}

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (signInUserDto: SignInUserDto) => {
    let response
    try {
      response = await signInAPI(signInUserDto)
    } catch (error) {
      // TODO: implement proper error handling (e. g. retry 3 times)
      const errorMessage = error.response.data.message
      throw new Error(errorMessage)
    }
    return response.data
  }
)

export const refreshTokens = createAsyncThunk('auth/refresh', async () => {
  let response
  try {
    response = await refreshTokensAPI()
  } catch (error) {
    // TODO: implement proper error handling (e. g. retry 3 times)
    const errorMessage = error.response.data.message
    throw new Error(errorMessage)
  }
  return response.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.tokens.access_token = null
      state.tokens.refresh_token = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.pending, (state, action) => {
        state.authentication.status = 'loading'
        state.authentication.error = null
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.authentication.status = 'succeeded'
        const { access_token, refresh_token } = action.payload
        state.tokens.access_token = access_token ?? state.tokens.access_token
        state.tokens.refresh_token = refresh_token ?? state.tokens.refresh_token
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.authentication.status = 'failed'
        // check if errorMessage is array or a simple string
        const error = action.error.message!
        state.authentication.error =
          typeof error === 'string' ? error : error[0]
        state.tokens.access_token = null
        state.tokens.refresh_token = null
      })
      // refresh
      .addCase(refreshTokens.pending, (state, action) => {
        state.refresh.status = 'loading'
        state.refresh.error = null
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.refresh.status = 'succeeded'
        const { access_token, refresh_token } = action.payload
        state.tokens.access_token = access_token ?? state.tokens.access_token
        state.tokens.refresh_token = refresh_token ?? state.tokens.refresh_token
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.refresh.status = 'failed'
        // check if errorMessage is array or a simple string
        const error = action.error.message!
        state.error = typeof error === 'string' ? error : error[0]
        state.tokens.access_token = null
        state.tokens.refresh_token = null
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
