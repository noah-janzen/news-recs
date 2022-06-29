import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DateEntered } from '../model/DateEntered'
import { Gender } from '../model/Gender'
import { Language } from '../model/Language'

interface Payload {
  identifier: string
  value: any
}

export interface RegistrationData {
  language: null | Language
  dateOfBirth: DateEntered
  gender: null | Gender
  email: string
  password: string
}

const initialState: RegistrationData = {
  language: null,
  dateOfBirth: {
    day: '',
    month: '',
    year: '',
  },
  gender: null,
  email: '',
  password: '',
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: initialState,
  reducers: {
    setValue: (state, action: PayloadAction<Payload>) => {
      const input = action.payload
      state[input.identifier] = input.value // TODO: fix typescript error
    },
  },
})

export const { setValue } = registrationSlice.actions

export default registrationSlice.reducer
