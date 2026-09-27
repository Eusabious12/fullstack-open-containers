import { render, screen } from '@testing-library/react'
import BlogView from './BlogView'

const blog = {
  id: '123',
  title: 'Testing single blog view',
  author: 'Jane Doe',
  url: 'http://example.com/testing',
  likes: 5,
  user: { username: 'creator', name: 'Creator Name' },
}

test('shows info and likes but no buttons for unauthenticated users', () => {
  render(<BlogView blog={blog} user={null} />)

  expect(screen.getByText('Testing single blog view Jane Doe')).toBeDefined()
  expect(screen.getByText('http://example.com/testing')).toBeDefined()
  expect(screen.getByText('likes 5', { exact: false })).toBeDefined()

  expect(screen.queryByRole('button', { name: 'like' })).toBeNull()
  expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
})

test('shows only the like button to a non-creator', () => {
  const otherUser = { username: 'someoneelse', name: 'Someone Else' }
  render(<BlogView blog={blog} user={otherUser} updateBlog={() => {}} />)

  expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
  expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
})

test('shows both like and remove buttons to the creator', () => {
  const creator = { username: 'creator', name: 'Creator Name' }
  render(
    <BlogView
      blog={blog}
      user={creator}
      updateBlog={() => {}}
      deleteBlog={() => {}}
    />
  )

  expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
  expect(screen.getByRole('button', { name: 'remove' })).toBeDefined()
})
