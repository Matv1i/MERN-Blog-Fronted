import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import Tags from "../Components/Tags"

import Post from "../Components/Post"
import { fetchPosts, fetchTags } from "../redux/slices/posts"
import SideBar from "../Components/SideBar"
import usePosts from "../CustomHooks/usePosts"

const TagSelect = () => {
  const [isPopular, setIsPopular] = useState(false)
  const { posts, status, tags } = usePosts()
  const { nameOfTag } = useParams()

  const sortedPosts = useCallback(
    isPopular
      ? [...posts].sort((a, b) => b.viewscount - a.viewscount)
      : [...posts].reverse(),
    [posts]
  )

  const filteredPosts = sortedPosts.filter((post) =>
    post.tags.includes(nameOfTag)
  )

  const isLoading = status === "loading"

  return (
    <div className="w-full bg-slate-100">
      <div className="w-full justify-center  flex items-start">
        <div
          id="posts"
          className="max-xl:border-none  justify-start w-3/5 m-10 mt-0 flex flex-col items-center max-xl:w-full max-md:m-4"
        >
          {" "}
          <p className="text-4xl max-md:flex  max-md:text-4xl max-md:justify-center max-md:pl-0 mr-10 max-md:ml-0 max-md:items-center font-semibold flex justify-start items-start w-5/6 ml-32 pt-4 text-gray-500">
            <span c>#</span>
            {nameOfTag}
          </p>
          {isLoading ? (
            <div className="w-full min-h-full flex justify-center items-center ">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Post
                id={post._id}
                key={post._id}
                title={post.title}
                description={post.text}
                imageUrl={post.imageUrl}
                avatarUrl={post.user.avatarUrl}
                posterName={post.user.fullName}
                date={new Date(post.createdAt).toLocaleDateString("en-EN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                tags={post.tags}
                views={post.viewscount}
              />
            ))
          )}
        </div>
        <SideBar posts={posts} />
      </div>
    </div>
  )
}

export default TagSelect
