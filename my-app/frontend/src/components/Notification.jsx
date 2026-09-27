import { Alert } from '@mui/material'
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return (
    <Alert
      severity={notification.type === 'error' ? 'error' : 'success'}
      style={{ marginTop: 8, marginBottom: 8 }}
    >
      {notification.message}
    </Alert>
  )
}

export default Notification