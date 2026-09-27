import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls createBlog with the right details when a blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  await user.type(screen.getByPlaceholderText('title'), 'A test-driven blog')
  await user.type(screen.getByPlaceholderText('author'), 'Test Author')
  await user.type(
    screen.getByPlaceholderText('url'),
    'http://example.com/tdd-blog'
  )
  await user.click(screen.getByText('create'))

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('A test-driven blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://example.com/tdd-blog')
})
