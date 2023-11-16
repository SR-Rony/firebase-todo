import { createSlice } from '@reduxjs/toolkit'

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState: {
    value: localStorage.getItem('userdata')? JSON.parse(localStorage.getItem('userdata')):null,
  },
  reducers: {
    activeUser: (state,action) => {
        state.value=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { activeUser} = activeUserSlice.actions

export default activeUserSlice.reducer