import React, { useState } from "react" //#endregion

import Button from "./Button"

import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchUserData,
  selectIsAuth,
  selectUserData,
} from "../redux/slices/auth"
import { logout } from "../redux/slices/auth"

import iconLogOut from "../assets/logout.png"

export const Navbar = () => {
  const isAuth = useSelector(selectIsAuth)
  const userdata = useSelector(selectUserData)
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logout())
    window.localStorage.removeItem("token")
  }

  return (
    <header className="px-8 py-4 bg-black  w-full duration-300 ease-in-out transform   ">
      <nav className="flex justify-between  items-center max-container ">
        <a href="/" className="text-2xl text-orange-600 text-">
          Blogger
        </a>

        <div className="flex items-center justify-center  gap-4 max-sm:gap-2 ">
          {isAuth ? (
            <>
              {" "}
              <p className="max-sm:pl-4 text-white">{userdata.fullName}</p>
              <div className="w-8 h-8 justify-center  flex">
                <Link to={`/profile/${userdata._id}`}>
                  <img
                    src={userdata.avatarUrl}
                    className=" w-full h-full rounded-full object-cover"
                  />
                </Link>
              </div>
              <button
                onClick={logOut}
                className="bg-orange-600 px-3 rounded-md flex leading-normal py-1.5 text-orange-600 "
              >
                <Link to="/">
                  <img
                    width={23}
                    height={10}
                    className="object-fit"
                    src={iconLogOut}
                  />
                </Link>
              </button>
            </>
          ) : (
            <>
              {" "}
              (
              <button className="bg-white px-5 rounded-md  leading-normal py-1.5 text-orange-600">
                <Link to="/auth/login">Log In</Link>
              </button>
              <button className="bg-orange-600 leading-normal rounded-md  px-3 py-1.5 text-white">
                <Link to="/auth/register">Sign Up</Link>
              </button>
              )
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
