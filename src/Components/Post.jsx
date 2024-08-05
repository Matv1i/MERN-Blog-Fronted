import React from "react"
import { Link } from "react-router-dom"
import eyeIcon from "../assets/eye-svgrepo-com.svg"

const truncateText = (text, wordLimit) => {
  const words = text.split(" ")
  if (words.length <= wordLimit) return text
  return words.slice(0, wordLimit).join(" ") + "..."
}

const truncateTitle = (title, charLimit) => {
  if (title.length <= charLimit) return title
  return title.slice(0, charLimit) + "..."
}

const Post = ({
  id,
  title,
  description,
  imageUrl,
  avatarUrl,
  posterName,
  date,
  tags,
  views,
  width,
  height,
  userId,
}) => {
  return (
    <div
      className={`${width ? width : "w-full"}  ${
        height ? height : ""
      }  max-w-3xl flex flex-col justify-center items-center shadow-lg border-2 rounded-lg bg-white p-4 my-8`}
    >
      {imageUrl && (
        <div className="w-full">
          <img
            src={`http://localhost:5000${imageUrl}`}
            alt="post image"
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="w-full flex items-center mt-4">
        <img
          src={avatarUrl}
          alt="poster avatar"
          className="w-10 h-10 object-cover rounded-full mr-4"
        />
        <Link to={`/profile/${userId}`}>
          <div>
            <h2 className="text-lg font-semibold">{posterName}</h2>
            <p className="text-gray-600">{date}</p>
          </div>
        </Link>
      </div>
      <div className="w-full mt-4">
        <h1 className="text-3xl text-orange-500 font-bold mb-2">
          <Link to={`/posts/${id}`}>{truncateTitle(title, 50)}</Link>
        </h1>
        <p className="text-gray-700 mb-4">{truncateText(description, 12)}</p>
        <div className="flex flex-wrap w-full justify-between gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-white px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
          <div className="flex text-gray-400 font-semibold flex-row">
            <img
              width={25}
              className="fill-gray-400 object-contain"
              src={eyeIcon}
              alt="views icon"
            />
            <span className="bg-white px-2 py-1 rounded">{views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
