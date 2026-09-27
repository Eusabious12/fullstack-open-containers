import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Container, AppBar, Toolbar, Button } from '@mui/material'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorBoundary from './components/ErrorBoundary'
import { useNotify } from './NotificationContext'
import { useUserValue, useUserDispatch } from './UserContext'
import persistentUser from './services/persistentUser'

const App = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()

  const navigate = useNavigate()
  const notify = useNotify()
  const queryClient = useQueryClient()

  useEffect(() => {
    const u = persistentUser.getUser()
    if (u) {
      userDispatch({ type: 'SET', payload: u })
      blogService.setToken(u.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const blogs = result.data || []

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, blogObject }) => blogService.update(id, blogObject),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const handleLogin = async (username, password) => {
    try {
      const u = await loginService.login({ username, password })
      persistentUser.saveUser(u)
      blogService.setToken(u.token)
      userDispatch({ type: 'SET', payload: u })
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    persistentUser.removeUser()
    userDispatch({ type: 'CLEAR' })
    navigate('/')
  }

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject, {
      onSuccess: (returned) => {
        notify(
          `a new blog "${returned.title}" by ${returned.author} added`,
          'success'
        )
        navigate('/')
      },
    })
  }

  const deleteBlog = (id) => {
    removeBlogMutation.mutate(id, {
      onSuccess: () => navigate('/'),
    })
  }

  const updateBlog = (id, blogObject) => {
    updateBlogMutation.mutate({ id, blogObject })
  }

  const addComment = (id, comment) => {
    commentMutation.mutate({ id, comment })
  }

  const match = useMatch('/blogs/:id')
  const matchedBlog = match ? blogs.find((b) => b.id === match.params.id) : null

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/create">
              create new blog
            </Button>
          )}
          {user ? (
            <>
              <span style={{ marginLeft: 8, marginRight: 8 }}>
                {user.name} logged in
              </span>
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <h2>blog app</h2>
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Blogs blogs={blogs} />} />
          <Route
            path="/blogs/:id"
            element={
              <BlogView
                blog={matchedBlog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                addComment={addComment}
                user={user}
              />
            }
          />
          <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route
            path="/login"
            element={<LoginForm handleLogin={handleLogin} />}
          />
          <Route
            path="*"
            element={
              <div>
                <h2>Page not found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App