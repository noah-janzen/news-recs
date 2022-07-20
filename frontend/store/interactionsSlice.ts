import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Interaction {
  newsArticleId: string
  clicked: boolean
}

export interface InteractionsData {
  interactions: {
    [key: string]: boolean
  }
}

const initialState: InteractionsData = {
  interactions: {},
}

export const interactionsSlice = createSlice({
  name: 'interactions',
  initialState: initialState,
  reducers: {
    addInteraction: (state, action: PayloadAction<Interaction>) => {
      const interaction = action.payload
      state.interactions[interaction.newsArticleId] =
        state.interactions[interaction.newsArticleId] || interaction.clicked
    },
    clearInteractions: (state) => {
      state.interactions = {}
    },
  },
})

export const { addInteraction, clearInteractions } = interactionsSlice.actions

export default interactionsSlice.reducer
