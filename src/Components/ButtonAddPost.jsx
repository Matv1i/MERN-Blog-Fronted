import React from "react"
import { Link } from "react-router-dom"

const ButtonAddPost = () => {
  return (
    <Link to="/add-post">
      <div className="px-4 transition-all 0.3s ease hover:scale-110 rounded-full bg-orange-500 bottom-4 right-4 fixed z-10 ">
        <p className="text-white text-4xl">+</p>
      </div>
    </Link>
  )
}

export default ButtonAddPost
