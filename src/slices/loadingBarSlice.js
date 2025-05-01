import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle'
}

const loadingBarSlice = createSlice({
  name: 'loadingBar',
  initialState,
  reducers: {
    startLoading (state) {
      state.status = 'loading'
    },
    loadingComplete (state) {
      state.status = 'complete'
    },
    resetLoading (state) {
      state.status = 'idle'
    }
  }
})

export const { startLoading, loadingComplete, resetLoading } =
  loadingBarSlice.actions

export default loadingBarSlice.reducer
