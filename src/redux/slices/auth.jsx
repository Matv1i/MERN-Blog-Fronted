// src/redux/slices/auth.jsx

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params)
    return data
  }
)

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me")
  return data
})

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params)
    return data
  }
)

const initialState = {
  data: null,
  status: "idle",
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null
      state.status = "idle"
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = "succeeded"
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = "succeeded"
      })
      .addCase(fetchAuthMe.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })

      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = "succeeded"
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export default authSlice.reducer

export const { logout } = authSlice.actions

export const selectUserData = (state) => state.auth.data
