import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotify = () => {
  const [, dispatch] = useContext(NotificationContext)
  return (message, type = 'success') => {
    dispatch({ type: 'SET', payload: { message, type } })
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext