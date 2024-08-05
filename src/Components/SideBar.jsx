import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchComments } from "../redux/slices/comments"
import Tags from "./Tags"
import { Link } from "react-router-dom"

const SideBar = ({ posts }) => {
  const comments = useSelector((state) => state.comments.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch])

  return (
    <div className="pt-8 gap-10 w-1/5 max-xl:hidden">
      <div className="m-10 w-full h-60 rounded-lg shadow-xl flex flex-col justify-start items-start bg-white gap-3">
        <p className="text-3xl pl-4 pt-2">Tags</p>
        {posts
          .slice(-3)
          .reverse()
          .map((post) =>
            post.tags.map((tag) => (
              <Tags key={`${post._id}-${tag}`} tag={tag} postId={post._id} />
            ))
          )}
      </div>
      <div className="m-10 w-full h-60 rounded-lg shadow-xl flex flex-col justify-start items-start bg-white gap-3">
        <p className="text-3xl pl-4 pt-2">Comments</p>
        {comments
          .slice(-2)
          .reverse()
          .map((comment) => (
            <Link className="w-full  " to={`/posts/${comment.postId}`}>
              <div
                key={comment._id}
                className="flex h-20 items-start gap-3 hover:bg-slate-200 cursor-pointer  w-full px-4 py-3 rounded-lg"
              >
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img
                    src={comment.avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800">
                    {comment.user}
                  </p>
                  <p className="text-sm text-gray-600">
                    {comment.text.length > 80
                      ? `${comment.text.slice(0, 80)}...`
                      : comment.text}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default SideBar
