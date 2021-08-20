import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

describe('CreateBlogForm component', () => {
  test('form calls event handler with the right details when a new blog is created', () => {
    const addBlogMockHandler = jest.fn()

    const component = render(
      <CreateBlogForm addBlog={addBlogMockHandler} />
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, { target: { value: 'Test blog' } })
    fireEvent.change(authorInput, { target: { value: 'Test author' } })
    fireEvent.change(urlInput, { target: { value: 'Test URL' } })
    fireEvent.submit(form)

    console.log(addBlogMockHandler.mock.calls[0][0].title)

    expect(addBlogMockHandler.mock.calls).toHaveLength(1)
    expect(addBlogMockHandler.mock.calls[0][0]).toEqual({
      title: 'Test blog',
      author: 'Test author',
      url: 'Test URL'
    })

  })
})
