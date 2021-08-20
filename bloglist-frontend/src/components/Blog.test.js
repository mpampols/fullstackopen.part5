import React from 'react' 
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

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