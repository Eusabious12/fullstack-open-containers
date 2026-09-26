import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map(todo => (
          <Todo
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        ))
        .reduce((acc, cur, i) => [...acc, <hr key={`hr-${i}`} />, cur], [])}
    </>
  )
}

export default TodoList
