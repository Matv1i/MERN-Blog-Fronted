import React, { useMemo } from "react"

const UsePostsForProfile = (id, posts) => {
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.user._id === id)
  }, [posts, id])

  const countPosts = useMemo(() => filteredPosts.length, [filteredPosts])

  const bestPost = useMemo(() => {
    return filteredPosts.sort((a, b) => b.viewscount - a.viewscount)[0]
  }, [filteredPosts])

  const otherPosts = useMemo(() => {
    return filteredPosts.filter(
      (post) => post._id !== (bestPost && bestPost._id)
    )
  }, [filteredPosts, bestPost])

  return { countPosts, bestPost, otherPosts }
}

export default UsePostsForProfile
