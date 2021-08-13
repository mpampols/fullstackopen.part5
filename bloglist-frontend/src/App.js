import React, { useState, useEffect, useRef } from "react"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogForm"
import Toggable from "./components/Toggable"

import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs,    setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user,     setUser] = useState(null)

  const [valueTitleNewBlog,  setValueTitleNewBlog] = useState("")
  const [valueAuthorNewBlog, setValueAuthorNewBlog] = useState("")
  const [valueUrlNewBlog,    setValueUrlNewBlog] = useState("")

  const [notificationMessage, setNotificationMessage] = useState({ status: 'ok', message: ''})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <Toggable buttonLabel='login'>
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({target}) => setUsername(target.value)}
            handlePasswordChange={({target}) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Toggable>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <Toggable buttonLabel='create blog post' ref={blogFormRef}>
          <CreateBlogForm
            addBlog={addBlog}
            valueTitleNewBlog={valueTitleNewBlog}
            valueAuthorNewBlog={valueAuthorNewBlog}
            valueUrlNewBlog={valueUrlNewBlog}
            handleAuthorBlog={handleAuthorBlog}
            handleTitleBlog={handleTitleBlog}
            handleUrlBlog={handleUrlBlog}
          />
        </Toggable>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setNotificationMessage({status: 'ko', message: 'Wrong credentials'});
      setTimeout(() => {
        setNotificationMessage({status: 'ok', message: ''})
      }, 5000)
    }
  }

  const handleLogoutClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleTitleBlog = (event) => {
    setValueTitleNewBlog(event.target.value)
  }

  const handleAuthorBlog = (event) => {
    setValueAuthorNewBlog(event.target.value)
  }

  const handleUrlBlog = (event) => {
    setValueUrlNewBlog(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: valueTitleNewBlog,
      author: valueAuthorNewBlog,
      url: valueUrlNewBlog
    }

    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setValueTitleNewBlog('')
      setValueAuthorNewBlog('')
      setValueUrlNewBlog('')
      blogFormRef.current.toggleVisibility() // Hide creation form
      setNotificationMessage({status: 'ok', message: 'Blog added successfully'});
      setTimeout(() => {
        setNotificationMessage({status: 'ok', message: ''})
      }, 5000)
    } catch(exception) {
      setNotificationMessage({status: 'ko', message: 'Error adding blog'});
      setTimeout(() => {
        setNotificationMessage({status: 'ok', message: ''})
      }, 5000)
    }
  }

  const blogList = () => (
    blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification status={notificationMessage.status} message={notificationMessage.message} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogoutClick}>logout</button></p>
          {blogForm()}
          <br/>
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App
