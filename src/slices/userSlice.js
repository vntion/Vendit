import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllUsers, getUserProfile, login, register } from '../API/apiUser'
import { setIsAuthorized } from './authSlice'
import { createSession, getSession } from '../utils/session'

export const fetchGetAllUsers = createAsyncThunk(
  'user/fetchGetAllUsers',
  getAllUsers
)

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async function (data, { dispatch }) {
    const token = await login(data.email, data.password)
    const user = await getUserProfile(token)
    dispatch(setIsAuthorized(true))
    createSession(token)
    console.log(token)

    return user
  }
)

export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  async function (data, { dispatch }) {
    const regis = await register(data.name, data.email, data.password)
    const token = await login(data.email, data.password)
    dispatch(setIsAuthorized(true))
    createSession(token)

    return regis
  }
)

export const fetchSession = createAsyncThunk(
  'user/fetchSession',
  async function (_, { dispatch }) {
    const session = getSession()

    if (!session) return null
    const user = await getUserProfile(session)
    dispatch(setIsAuthorized(true))
    return user
  }
)

const initialState = {
  users: [],
  loggedUser: null,
  status: 'idle',
  error: ''
}

const userSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    setError (state, action) {
      state.error = action.payload
    },
    logout (state) {
      state.loggedUser = null
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchGetAllUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
        state.status = 'idle'
        state.users = action.payload
      })
      .addCase(fetchGetAllUsers.rejected, (state) => {
        state.status = 'error'
        state.error = 'Gagal mendapatkan semua user'
      })

      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'idle'
        state.loggedUser = action.payload
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })

      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'idle'
        state.loggedUser = action.payload
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })

      .addCase(fetchSession.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.status = 'idle'
        state.loggedUser = action.payload
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })
})

export const { setError, logout } = userSlice.actions

export default userSlice.reducer

export const getUsers = (state) => state.user.users
