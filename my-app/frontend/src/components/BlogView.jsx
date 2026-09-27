import { useState } from 'react'
import {
  Card, CardContent, Typography, Button, TextField, List, ListItem,
} from '@mui/material'

const BlogView = ({ blog, updateBlog, deleteBlog, addComment, user }) => {
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const handleLike = () => {
    updateBlog(blog.id, {
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    addComment(blog.id, comment)
    setComment('')
  }

  const showDelete = user && blog.user && blog.user.username === user.username

  return (
    <Card style={{ marginTop: 15, maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {blog.title} {blog.author}
        </Typography>
        <Typography gutterBottom>
          <a href={blog.url}>{blog.url}</a>
        </Typography>
        <Typography gutterBottom>
          likes {blog.likes}
          {user && (
            <Button
              size="small"
              variant="outlined"
              onClick={handleLike}
              style={{ marginLeft: 8 }}
            >
              like
            </Button>
          )}
        </Typography>
        <Typography gutterBottom>added by {blog.user?.name}</Typography>
        {showDelete && (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleDelete}
          >
            remove
          </Button>
        )}

        <Typography variant="h6" style={{ marginTop: 16 }}>
          comments
        </Typography>
        <form onSubmit={handleComment} style={{ marginBottom: 8 }}>
          <TextField
            size="small"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <Button type="submit" variant="contained" size="small" style={{ marginLeft: 8 }}>
            add comment
          </Button>
        </form>
        <List>
          {(blog.comments || []).map((c, index) => (
            <ListItem key={index}>{c}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default BlogView