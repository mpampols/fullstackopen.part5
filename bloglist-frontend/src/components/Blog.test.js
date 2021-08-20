import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders content', () => {
    const blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'https://google.com',
      likes: 10
    }

    const component = render (
      <Blog blog={blog} />
    )

    const div = component.container.querySelector('.contents')
    expect(div).toHaveTextContent(
      'Blog title Blog author'
    )

    const li = component.container.querySelector('.additionalInfo')
    expect(li).toHaveStyle('display: none')
  })

  test('toggled content is shown when button clicked', () => {
    const blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'https://google.com',
      likes: 10
    }

    const component = render (
      <Blog blog={blog} />
    )

    const viewButton = component.container.querySelector('.viewButton')
    fireEvent.click(viewButton)

    const div = component.container.querySelector('.additionalInfo')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking like button twice calls event handler twice', () => {
    const blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'https://google.com',
      likes: 10
    }

    const mockHandler = jest.fn()

    const component = render (
      <Blog blog={blog} addBlogLike={mockHandler} />
    )

    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
