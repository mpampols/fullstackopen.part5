import React, { useState } from 'react'

const Blog = ({
  blog,
  currentUsername,
  addBlogLike,
  removeBlog
}) => {
  const [visible, setVisible] = useState(true)
  const blogAuthor = blog.user.username ? blog.user.username : null

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showIfAuthor = { display: currentUsername.username === blogAuthor ? '' : 'none' }

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
    <div className='blog' style={blogStyle} data-likes={blog.likes}>
      <div className='contents'>{blog.title} {blog.author}</div>
      <button className='viewButton' onClick={toggleVisibility} style={showWhenVisible}>view</button>
      <button className='hideButton' onClick={toggleVisibility} style={hideWhenVisible}>hide</button>
      <div className='additionalInfo' style={hideWhenVisible}>
        <ul>
          <li>URL: {blog.url}</li>
          <li>Likes: {blog.likes} <button className='likeButton' onClick={addBlogLike}>like</button></li>
        </ul>
        <button style={showIfAuthor} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog