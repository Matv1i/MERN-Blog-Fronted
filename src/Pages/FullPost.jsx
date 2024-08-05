import React, { useState, useEffect } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import axios from ".././axios"
import { useDispatch, useSelector } from "react-redux"
import { selectUserData } from "../redux/slices/auth"
import ReactMarkdown from "react-markdown"
import { fetchRemove } from "../redux/slices/posts"
import Comments from "../Components/Comments"

const FullPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  const [isDelete, setIsDelete] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        console.error("Error fetching post:", error)
      }
    }
    fetchPost()
  }, [id])

  const userdata = useSelector(selectUserData)

  const onClickRemove = (event) => {
    event.preventDefault()
    setIsDelete(true)
    dispatch(fetchRemove(id))
  }

  if (isDelete) {
    return <Navigate to="/" />
  }

  if (!userdata) {
    return (
      <div className="pt-20 w-full min-h-full flex justify-center items-center">
        <div className="w-80 gap-7 h-80 shadow-xl rounded-xl flex justify-center items-center flex-col">
          <button className="bg-white px-5 rounded-md leading-normal border-2 border-orange-500 w-40 py-1.5 text-orange-600">
            <Link to="/auth/login">Log In</Link>
          </button>
          <p className="font-bold">Or</p>
          <button className="bg-orange-600 leading-normal rounded-md w-40 px-3 py-1.5 text-white">
            <Link to="/auth/register">Sign Up</Link>
          </button>
          <p className="font-bold text-xl"> To watch this Post</p>
        </div>
      </div>
    )
  }

  if (!post) return <p>Loading...</p>

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-8">
      <div className="w-3/4 max-md:w-full max-md:bg-gray-100 max-md:shadow-none bg-white rounded-lg p-7 max-md:p-0 flex flex-col justify-start item shadow-lg">
        <div className="h-auto p-5">
          <div className="flex justify-between items-center">
            <p className="font-bold text-4xl">{post.title}</p>

            {userdata._id === post.user._id ? (
              <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mr-2">
                  <Link to={`/posts/${id}/edit`}>Edit</Link>
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                  onClick={onClickRemove}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="text-gray-700 pt-2 pl-2 text-sm flex gap-4">
            <p>Author: {post.user.fullName}</p>
            <p>Views: {post.viewscount}</p>
            <p>
              Posted:{" "}
              {new Date(post.createdAt).toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>Tags: {post.tags.map((tag) => `#${tag} `)}</p>
          </div>
        </div>
        {post.imageUrl ? (
          <img
            src={
              post.imageUrl.startsWith("http")
                ? post.imageUrl
                : `http://localhost:5000${post.imageUrl}`
            }
            alt="Post"
            className="w-full h-80 object-cover rounded-xl mb-4 p-1"
          />
        ) : (
          ""
        )}

        <ReactMarkdown className="text-md text-wrap" children={post.text} />
        <Comments idOfPost={id} userdata={userdata} />
      </div>
    </div>
  )
}

export default FullPost
