import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Typography, List, ListItem } from '@mui/material'
import userService from '../services/users'

const User = () => {
  const id = useParams().id
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
  })

  if (result.isPending) return <div>loading...</div>
  if (result.isError) return <div>user service not available</div>

  const user = result.data.find((u) => u.id === id)
  if (!user) return <div>user not found</div>

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: 15 }}>{user.name}</Typography>
      <Typography variant="h6" style={{ marginTop: 10 }}>added blogs</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default User