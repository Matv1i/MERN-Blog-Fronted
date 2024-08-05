import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import { NewPost } from "./Pages/NewPost"
import FullPost from "./Pages/FullPost"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth"
import Tags from "./Components/Tags"
import Profile from "./Pages/Profile"
import TagSelect from "./Pages/TagSelect"
import MyProfile from "./Pages/Profile"

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />

          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/add-post" element={<NewPost />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/tags/:nameOfTag" element={<TagSelect />} />
          <Route path="/posts/:id/edit" element={<NewPost />} />
        </Routes>
      </div>
    </>
  )
}

export default App
