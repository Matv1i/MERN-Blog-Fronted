import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchComments } from "../redux/slices/comments"

const LatestComments = ({ fullName, avatarUrl, text, postId }) => {
  const comments = useSelector((state) => state.comments.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch])

  const truncateText = (text, length = 100) => {
    if (text.length > length) {
      return text.slice(0, length) + "..."
    }
    return text
  }

  return (
    <div className="w-full  bg-white ">
      <Link
        to={`/posts/${postId}`}
        key={comment._id}
        className="w-full block text-wrap"
      >
        <div className="flex justify-start items-center gap-3 hover:bg-slate-200 cursor-pointer px-4 py-3 rounded-lg">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-wrap flex-1">
            <p className="font-semibold text-lg text-gray-800">
              {comment.user}
            </p>
            <p className="text-sm text-gray-600">{truncateText(text, 80)}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default LatestComments
