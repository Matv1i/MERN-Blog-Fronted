import React, { useRef, useCallback, useState, useMemo, useEffect } from "react"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserData } from "../redux/slices/auth"
import axios from "../axios"

export const NewPost = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState([])
  const inputRef = useRef()
  const userdata = useSelector(selectUserData)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const isEditing = Boolean(id)
  const onSubmit = async () => {
    setLoading(true)
    try {
      const fields = { title, imageUrl, tags, text: value }
      const response = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields)

      console.log(response.data)

      if (isEditing) {
        navigate(`/posts/${id}`)
      } else {
        navigate(`/posts/${response.data._id}`)
      }
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert("Failed to create the post. Please check the form data.")
    } finally {
      setLoading(false)
    }
  }

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append("image", file)
      const { data } = await axios.post("/uploads", formData)
      setImageUrl(data.url)
    } catch (err) {
      alert("Something went wrong")
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl("")
  }

  const onChange = useCallback((value) => {
    setValue(value)
  }, [])

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then((res) => {
        console.log(res)
        setTitle(res.data.title)
        setImageUrl(res.data.imageUrl)
        setValue(res.data.text)
        setTags(res.data.tags)
      })
    }
  }, [id])

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Write a post . . .",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  )

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0)
    setTags(tagsArray)
  }

  if (!userdata)
    return (
      <div className="pt-20 w-full min-h-full flex justify-center items-center">
        <div className="w-80 gap-7 h-80 shadow-xl rounded-xl flex justify-center items-center flex-col">
          <button className="bg-white px-5 rounded-md leading-normal border-2 border-orange-500 w-40 py-1.5 text-orange-600">
            <Link to="/auth/login">Log In</Link>
          </button>
          <p className="font-bold">Or</p>
          <button className="bg-orange-600 leading-normal rounded-md w-40 px-3 py-1.5 text-white">
            <Link to="/auth/register">Sign Up</Link>
          </button>
          <p className="font-bold text-xl">To Create</p>
        </div>
      </div>
    )

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <button
        className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
        onClick={() => inputRef.current.click()}
      >
        Upload Image
      </button>
      <input
        ref={inputRef}
        type="file"
        id="fileInput"
        onChange={handleChangeFile}
        className="hidden"
      />
      {imageUrl && (
        <>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600"
            onClick={onClickRemoveImage}
          >
            Remove
          </button>
          <img
            className="mt-4"
            width={270}
            height={200}
            src={
              imageUrl.startsWith("http")
                ? imageUrl
                : `http://localhost:5000${imageUrl}`
            }
            alt="Uploaded"
          />
        </>
      )}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Title..."
          className="w-full border-b-2 border-gray-300 py-2 text-3xl font-bold placeholder-gray-500 focus:outline-none focus:border-orange-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          className="w-full border-b-2 border-gray-300 py-2 mt-4 placeholder-gray-500 focus:outline-none focus:border-orange-500"
          value={tags.join(", ")}
          onChange={handleTagsChange}
        />
      </div>
      <div className="mt-8">
        <SimpleMDE value={value} onChange={onChange} options={options} />
      </div>
      <div className="mt-8 flex space-x-4">
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
        <a href="/" className="inline-block">
          <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
            Back
          </button>
        </a>
      </div>
    </div>
  )
}
