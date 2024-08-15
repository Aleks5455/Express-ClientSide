import { userApi } from "../../app/services/userApi"
import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../../app/types"
import type { RootState } from "../../app/store"

interface InitialState {
  user: User | null
  isAuthenticated: boolean
  users: User[] | null
  current: User | null
  token?: string
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.current = action.payload
        state.isAuthenticated = true
      })
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload
        },
      )
  },
})

export const { logout, resetUser } = slice.actions

export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.userAuth.isAuthenticated

export const selectCurrent = (state: RootState) => state.userAuth.current

export const selectUsers = (state: RootState) => state.userAuth.users

export const selectUser = (state: RootState) => state.userAuth.user
