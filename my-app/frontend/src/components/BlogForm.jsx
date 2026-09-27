import { TextField, Button } from '@mui/material'
import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title: title.value, author: author.value, url: url.value })
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            {...title}
            slotProps={{ htmlInput: { placeholder: 'title' } }}
          />
        </div>
        <div>
          <TextField
            label="author"
            {...author}
            slotProps={{ htmlInput: { placeholder: 'author' } }}
          />
        </div>
        <div>
          <TextField
            label="url"
            {...url}
            slotProps={{ htmlInput: { placeholder: 'url' } }}
          />
        </div>
        <Button variant="contained" type="submit" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm