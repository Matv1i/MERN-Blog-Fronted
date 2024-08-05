import React from "react"
import classNames from "classnames"

const Button = ({ background, text, label }) => {
  const buttonClass = classNames(
    `bg-${background}`,
    `text-${text}`,
    "px-4",
    "py-2"
  )

  return <button className={buttonClass}>{label}</button>
}

export default Button
