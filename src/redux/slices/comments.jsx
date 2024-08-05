import { createSlice } from "@reduxjs/toolkit"
import { asyncThunkCreator } from "@reduxjs/toolkit"

import { createAsyncThunk } from "@reduxjs/toolkit"

import axios from "../../axios.jsx"

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    try {
      const response = await axios.get(`/comments`)
      return response.data
    } catch (error) {
      console.error("Error fetching comments:", error)
      throw error
    }
  }
)

export const fetchRemove = createAsyncThunk(
  "comments/fetchRemove",
  async (id) => {
    try {
      await axios.delete(`/comments/${id}`)
      return id
    } catch (error) {
      console.error("Error removing comment:", error)
      throw error
    }
  }
)

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchComments.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = "loaded"
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "error"
        state.error = action.error.message
      })
      .addCase(fetchRemove.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (comment) => comment._id !== action.payload
        )
      })
  },
})

export default commentsSlice.reducer
