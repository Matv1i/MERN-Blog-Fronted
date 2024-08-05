import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchComments } from "../redux/slices/comments"
import axios from "../axios"

const Comments = ({ idOfPost, userdata }) => {
  const [newComment, setNewComment] = useState("")
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments.items)

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch, idOfPost])

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {
      const fields = {
        postId: idOfPost,
        text: newComment,
        avatarUrl: userdata.avatarUrl,
        fullName: userdata.fullName,
      }

      const response = await axios.post("/comments", fields)

      dispatch(fetchComments())

      setNewComment("")
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const filteredComments = comments.filter(
    (comment) => comment.postId === idOfPost
  )

  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(date).toLocaleDateString("ru-RU", options)
  }

  return (
    <>
      <p className="font-bold text-3xl">Comments</p>
      <form onSubmit={handleAddComment} className="flex flex-col">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-500 mb-4"
          placeholder="Add a comment..."
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
        >
          Add Comment
        </button>
      </form>
      <div className="w-full">
        {filteredComments.map((comment) => (
          <div
            className="text-wrap rounded-lg flex border-b-2 p-4"
            key={comment._id}
          >
            <div className="w-14 h-14 mr-4">
              <img
                src={comment.avatarUrl}
                className="rounded-full object-cover h-full w-full"
                alt="Avatar"
              />
            </div>
            <div className="text-wrap w-full grid grid-rows-auto grid-cols-1 relative">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{comment.user}</p>
                <p className="text-wrap">{comment.text}</p>
              </div>
              <p className="text-gray-500 text-sm self-end justify-self-end">
                {formatDate(comment.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Comments
