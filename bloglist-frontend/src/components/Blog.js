import React, { useState } from 'react'

const Blog = ({
  blog,
  currentUsername,
  addBlogLike,
  removeBlog
}) => {
  const [visible, setVisible] = useState(true)
  const blogAuthor = blog.user ? blog.user.username : null

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showIfAuthor = { display: currentUsername === blogAuthor ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title}&nbsp;
      <button onClick={toggleVisibility} style={showWhenVisible}>view</button>
      <button onClick={toggleVisibility} style={hideWhenVisible}>hide</button>
      <div style={hideWhenVisible}>
        <ul>
          <li>URL: {blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={addBlogLike}>like</button></li>
          <li>Author: {blog.author}</li>
        </ul>
        <button style={showIfAuthor} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog