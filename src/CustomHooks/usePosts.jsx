import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchPosts } from "../redux/slices/posts"
import { fetchTags } from "../redux/slices/posts"

const usePosts = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [dispatch])

  const { items: posts, status, tags } = useSelector((state) => state.posts)

  return { posts, status, tags }
}

export default usePosts
