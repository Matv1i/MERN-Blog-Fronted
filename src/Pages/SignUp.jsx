import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fetchRegister, selectIsAuth } from "../redux/slices/auth"
import { Navigate } from "react-router-dom"

const SignUp = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      avatarUrl: "",
      tags: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (values) => {
    const tagsArray = values.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    const result = await dispatch(fetchRegister({ ...values, tags: tagsArray }))
    const data = result.payload

    console.log(data)

    if (data && data.token) {
      window.localStorage.setItem("token", data.token)
    } else {
      alert("Something Went Wrong")
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Registration </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
              {...register("fullName", { required: "input a fullname" })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Почта
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
              {...register("email", { required: "Inpit a email" })}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
              {...register("password", { required: "Input a Password" })}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="avatar" className="block text-gray-700 mb-2">
              Avatar (URL)
            </label>
            <input
              type="text"
              id="avatar"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              {...register("avatarUrl")}
            />
          </div>
          <div className="mb-6"></div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-opacity-75"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
