import React from 'react'

const CreateBlogForm = ({
  addBlog,
  valueTitleNewBlog,
  valueAuthorNewBlog,
  valueUrlNewBlog,
  handleAuthorBlog,
  handleTitleBlog,
  handleUrlBlog
}) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        Title: <input value={valueTitleNewBlog} onChange={handleTitleBlog} /> <br/>
        Author: <input value={valueAuthorNewBlog} onChange={handleAuthorBlog} /> <br/>
        URL: <input value={valueUrlNewBlog} onChange={handleUrlBlog} /> <br/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default CreateBlogForm