import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUserData, selectIsAuth } from "../redux/slices/auth"
import Post from "../Components/Post"
import { useParams } from "react-router-dom"
import usePosts from "../CustomHooks/usePosts"
import UsePostsForProfile from "../CustomHooks/UsePostsForProfile"

const Profile = () => {
  const [userDate, setUserDate] = useState(null)
  const [userData, setUserData] = useState(null)
  const userdata = useSelector(selectUserData)
  const isAuth = useSelector(selectIsAuth)
  const { id } = useParams()
  const { posts } = usePosts()
  const { countPosts, bestPost, otherPosts } = UsePostsForProfile(id, posts)

  useEffect(() => {
    if (userdata && userdata._id === id) {
      setUserData(userdata)
    } else {
      const userPost = posts.find((post) => post.user._id === id)
      if (userPost) {
        setUserData(userPost.user)
      }
    }
  }, [id, userdata, posts])

  useEffect(() => {
    if (userData) {
      setUserDate(
        new Date(userData.createdAt).toLocaleDateString("en-EN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      )
    } else {
      setUserDate(null)
    }
  }, [userData])

  if (!isAuth) {
    return <p>You need to log in to view this profile.</p>
  }

  if (!userData) {
    return <p>Loading...</p>
  }

  return (
    <div className="w-full min-h-full flex flex-col">
      <div id="header" className="w-full flex max-md:flex-col border-b-2">
        <div className="w-1/3 max-md:w-full max-md:border-b-2">
          <div className="w-full p-3 rounded-xl pb-10 flex flex-col justify-start items-center">
            <div className="h-full w-full flex justify-center items-center gap-4 flex-col">
              <p className="font-bold text-3xl">My Profile</p>
              <div className="w-80 h-80 mt-8 rounded-full overflow-hidden">
                <img
                  src={userData.avatarUrl}
                  className="object-cover w-full h-full"
                  alt="Avatar"
                />
              </div>
              <p className="mt-4 font-bold text-3xl">{userData.fullName}</p>
              <div className="w-full flex flex-wrap flex-col gap-4 justify-center items-center text-xl">
                <p className="font-semibold justify-center flex gap-2 max-md:flex-0">
                  Posts:
                  <span className="text-gray-600"> {countPosts} </span>
                </p>
                {userDate && (
                  <p className="font-semibold gap-2 max-md:flex-0">
                    Member from:{" "}
                    <span className="text-gray-600">{userDate}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 max-md:w-full w-2/3">
          <div className="w-full flex flex-col justify-start items-center">
            <p className="font text-3xl font-bold">Most Popular Post</p>
            {bestPost && (
              <Post
                id={bestPost._id}
                key={bestPost._id}
                title={bestPost.title}
                description={bestPost.text}
                imageUrl={bestPost.imageUrl}
                avatarUrl={bestPost.user.avatarUrl}
                bestPosterName={bestPost.user.fullName}
                date={new Date(bestPost.createdAt).toLocaleDateString("en-EN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                tags={bestPost.tags}
                views={bestPost.viewscount}
                width={"w-full max-md:w-full"}
              />
            )}
          </div>
        </div>
      </div>
      <p className="flex justify-center font-bold mt-6 text-4xl">Other Posts</p>
      <div className="w-full px-4 max-md:px-2 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {otherPosts.map((post) => (
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
            width={"w-full"}
          />
        ))}
      </div>
    </div>
  )
}

export default Profile
