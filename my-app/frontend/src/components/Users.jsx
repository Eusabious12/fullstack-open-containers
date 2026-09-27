import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  TableContainer, Paper, Typography,
} from '@mui/material'
import userService from '../services/users'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
  })

  if (result.isPending) return <div>loading...</div>
  if (result.isError) return <div>user service not available</div>

  const users = result.data

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: 15 }}>Users</Typography>
      <TableContainer component={Paper} style={{ maxWidth: 500, marginTop: 10 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><strong>blogs created</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users