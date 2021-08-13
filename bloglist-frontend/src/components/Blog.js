import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
      {blog.title}
      <button onClick={toggleVisibility} style={showWhenVisible}>view</button>
      <button onClick={toggleVisibility} style={hideWhenVisible}>hide</button>
      <div style={hideWhenVisible}>
        <ul>
          <li>URL: {blog.url}</li>
          <li>Likes: {blog.likes}</li>
          <li>Author: {blog.author}</li>
        </ul>
      </div>
    </div>
  )
}

export default Blog