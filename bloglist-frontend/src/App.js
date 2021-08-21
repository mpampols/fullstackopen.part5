import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs,    setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,     setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({ status: 'ok', message: '' })

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

  const loginForm = () => (
    <Togglable buttonLabel='login' visible='true' ref={blogFormRef}>
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={ ({ target }) => setUsername(target.value) }
        handlePasswordChange={ ({ target }) => setPassword(target.value) }
        username={username}
        password={password}
      />
    </Togglable>
  )

  const addBlog = async (blog) => {
    try {
      const response = await blogService.create(blog)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility() // Hide creation form
      setNotificationMessage({ status: 'ok', message: 'Blog added successfully' })
      setTimeout(() => {
        setNotificationMessage({ status: 'ok', message: '' })
      }, 5000)
    } catch(exception) {
      setNotificationMessage({ status: 'ko', message: 'Error adding blog' })
      setTimeout(() => {
        setNotificationMessage({ status: 'ok', message: '' })
      }, 5000)
    }
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='create blog post' ref={blogFormRef}>
          <CreateBlogForm addBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setNotificationMessage({ status: 'ko', message: 'Wrong credentials' })
      setTimeout(() => {
        setNotificationMessage({ status: 'ok', message: '' })
      }, 5000)
    }
  }

  const handleLogoutClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlogLike = async id => {
    const blogToUpdate = blogs.find(blogs => blogs.id === id)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    await blogService.update(id, updatedBlog)
    setBlogs(blogs.map((blog) => blog.id === id ? updatedBlog : blog))
  }

  const removeBlog = async id => {
    const blogToDelete = blogs.find(blogs => blogs.id === id)
    //await blogService.remove(id)
    if (window.confirm(`Remove blog ${ blogToDelete.title }?`)) {
      setBlogs(blogs.filter((blog) => (blog.id !== id)))
    }
  }

  const blogList = () => {
    // Order by likes
    blogs.sort((a, b) => (b.likes - a.likes))

    return (
      blogs.map((blogs) => (
        <Blog
          key={blogs.id}
          blog={blogs}
          currentUsername={ user }
          addBlogLike={() => addBlogLike(blogs.id)}
          removeBlog={() => removeBlog(blogs.id)}
        />
      ))
    )
  }

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
