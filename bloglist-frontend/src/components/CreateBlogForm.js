import React, { useState } from 'react'

const CreateBlogForm = ({ addBlog }) => {
  const [title,  setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url,    setUrl] = useState('')

  const handleTitleBlog = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorBlog = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlBlog = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formCreateBlog'>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        Title: <input id='title' value={title} onChange={handleTitleBlog} /> <br/>
        Author: <input id='author' value={author} onChange={handleAuthorBlog} /> <br/>
        URL: <input id='url' value={url} onChange={handleUrlBlog} /> <br/>
        <button id='createBlogButton' type="submit">save</button>
      </form>
    </div>
  )
}

export default CreateBlogForm