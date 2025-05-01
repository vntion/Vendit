import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthorized: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthorized (state, action) {
      state.isAuthorized = action.payload
    }
  }
})

export const { setIsAuthorized } = authSlice.actions

export default authSlice.reducer
