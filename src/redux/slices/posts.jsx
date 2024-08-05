import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

// Fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get("/posts")

    return response.data
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
})

// Fetch tags
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  try {
    const response = await axios.get("/tags")

    return response.data
  } catch (error) {
    console.error("Error fetching tags:", error)
    throw error
  }
})

// Remove post
export const fetchRemove = createAsyncThunk("posts/fetchRemove", async (id) => {
  try {
    const response = await axios.delete(`/posts/${id}`)
    return id
  } catch (error) {
    console.error("Error removing post:", error)
    throw error
  }
})

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    tags: [],
    status: "idle",
    tagsStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = "loaded"
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "error"
      })

      .addCase(fetchTags.pending, (state) => {
        state.tagsStatus = "loading"
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload
        state.tagsStatus = "loaded"
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tagsStatus = "error"
      })

      .addCase(fetchRemove.pending, (state) => {})
      .addCase(fetchRemove.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post._id !== action.payload)
      })
      .addCase(fetchRemove.rejected, (state) => {})
  },
})

export default postsSlice.reducer
