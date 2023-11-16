import { configureStore } from '@reduxjs/toolkit'
import activeUserSlice from './slices/userSlice'

export default configureStore({
  reducer: {
    user:activeUserSlice,
  },
})