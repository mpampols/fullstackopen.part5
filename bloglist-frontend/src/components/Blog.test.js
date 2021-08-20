import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  let blog, component

  beforeEach(() => {
    blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'https://google.com',
      likes: 10
    }

    component = render (
      <Blog blog={blog} />
    )
  })

  test('renders content', () => {
    const div = component.container.querySelector('.contents')
    expect(div).toHaveTextContent(
      'Blog title Blog author'
    )

    const li = component.container.querySelector('.additionalInfo')
    expect(li).toHaveStyle('display: none')
  })

  test('toggled content is shown when button clicked', () => {
    const viewButton = component.container.querySelector('.viewButton')
    fireEvent.click(viewButton)

    const div = component.container.querySelector('.additionalInfo')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking like button twice calls event handler twice', () => {
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
