import React, { useState, useMemo, useCallback } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import Tags from "../Components/Tags"
import Post from "../Components/Post"
import SideBar from "../Components/SideBar"
import ButtonAddPost from "../Components/ButtonAddPost"
import usePosts from "../CustomHooks/usePosts"

const Home = () => {
  const { posts, tags, status } = usePosts()
  const [isPopular, setIsPopular] = useState(false)

  const isLoading = status === "loading"

  const handleSorting = useCallback(
    (sortBy) => {
      setIsPopular(sortBy === "popular")
    },
    [posts]
  )

  const sortedPosts = useMemo(() => {
    return isPopular
      ? [...posts].sort((a, b) => b.viewscount - a.viewscount)
      : [...posts].reverse()
  }, [posts, isPopular])

  return (
    <div className="w-full bg-slate-100 relative">
      <ButtonAddPost />
      <div className="w-full max-md:pb-10 h-80 font-montserrat bg-black flex justify-center items-center flex-col">
        <div className="flex text-4xl items-center px-4 leading-normal wrap text-white text-center flex-col">
          <p className="font-old pb-5 text-orange-500">Welcome to Our Blog</p>
          <p className="text-lg">
            Start your blog today and join a community of writers and readers
            who are passionate about sharing their stories and ideas.
          </p>
        </div>
        <button className="bg-orange-600 flex justify-center h-10 text-sm items-center w-20 leading-normal rounded-md mt-10 px-3 py-1.5 text-white ">
          <Link to="/add-post">Post</Link>
        </button>
      </div>

      <div className="w-full justify-center mt-4 flex items-start">
        <div
          id="posts"
          className="border-r-2 border-slate-200 max-xl:border-none justify-start w-3/5 m-10 mt-0 flex flex-col items-center max-xl:w-full max-md:m-4"
        >
          <div className="flex font-semibold text-gray-500 w-full max-md:ml-0 pt-5 gap-8 ml-80 text-xl justify-start items-center">
            <div
              className={`${
                isPopular ? "border-none" : "border-b-2"
              } border-orange-500 pb-2 text-center max-md:w-1/2`}
            >
              <button onClick={() => handleSorting("latest")}>Latest</button>
            </div>
            <div
              className={`${
                isPopular ? "border-b-2" : "border-none"
              } border-orange-500 pb-2 text-center max-md:w-1/2`}
            >
              <button onClick={() => handleSorting("popular")}>Popular</button>
            </div>
          </div>
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
            sortedPosts.map((post) => (
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
                userId={post.user._id}
              />
            ))
          )}
        </div>
        <SideBar posts={posts} />
      </div>
    </div>
  )
}

export default Home
