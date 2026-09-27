import { TextField, Button } from '@mui/material'
import { useField } from '../hooks'

const LoginForm = ({ handleLogin }) => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username.value, password.value)
    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            label="username"
            {...username}
            slotProps={{ htmlInput: { 'data-testid': 'username' } }}
          />
        </div>
        <div>
          <TextField
            label="password"
            {...password}
            slotProps={{ htmlInput: { 'data-testid': 'password' } }}
          />
        </div>
        <Button variant="contained" type="submit" style={{ marginTop: 10 }}>
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm