import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserData } from "../redux/slices/auth"
import { selectIsAuth } from "../redux/slices/auth"
import { Navigate } from "react-router-dom"

const Login = () => {
  const isAuth = useSelector(selectIsAuth)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  })

  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    const result = await dispatch(fetchUserData(values))
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
        <h2 className="text-2xl font-bold mb-6 text-center">Логин</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Почта
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-500"
              {...register("email", { required: "Введите вашу почту" })}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-500"
              {...register("password", { required: "Введите ваш пароль" })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-opacity-75"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
