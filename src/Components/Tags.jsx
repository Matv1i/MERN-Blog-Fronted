import React from "react"
import { Link } from "react-router-dom"

const Tags = ({ tag, postId }) => {
  return (
    <Link className="w-full  flex-wrap text-wrap" to={`/tags/${tag}`}>
      <div className="  flex justify-start items-center gap-3 hover:bg-slate-200 cursor-pointer px-4 py-3">
        {"   "}
        <p className="font-semibold text-xl">#</p>
        <p className="text-xl w-full font-bold flex-wrap text-wrap">{tag}</p>
      </div>
    </Link>
  )
}

export default Tags
