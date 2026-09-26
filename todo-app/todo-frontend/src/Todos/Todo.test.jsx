import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Todo from './Todo'

test('renders the todo text', () => {
  const todo = { _id: '1', text: 'Learn multi-stage builds', done: false }
  render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)
  expect(screen.getByText('Learn multi-stage builds')).toBeDefined()
})

test('shows "not done" state for an unfinished todo', () => {
  const todo = { _id: '1', text: 'A todo', done: false }
  render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)
  expect(screen.getByText('This todo is not done')).toBeDefined()
})
