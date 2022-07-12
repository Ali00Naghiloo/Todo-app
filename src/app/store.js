import { configureStore } from '@reduxjs/toolkit'
import valueReducer from '../features/slice'

export const store = configureStore({
  reducer: {
    value: valueReducer,
  },
})