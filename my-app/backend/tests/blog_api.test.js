const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
  { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://example.com/canonical', likes: 12 },
]

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Root', passwordHash })
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  token = loginResponse.body.token

  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  assert.ok(blog.id)
  assert.strictEqual(blog._id, undefined)
})

test('a valid blog can be added with a token', async () => {
  const newBlog = {
    title: 'Test Driven Development',
    author: 'Kent Beck',
    url: 'http://example.com/tdd',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  const titles = response.body.map(b => b.title)
  assert.ok(titles.includes('Test Driven Development'))
})

test('adding a blog fails with 401 if no token is provided', async () => {
  const newBlog = {
    title: 'No token blog',
    author: 'Anon',
    url: 'http://example.com/notoken',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('likes defaults to 0 when missing', async () => {
  const newBlog = {
    title: 'A blog with no likes field',
    author: 'Nobody',
    url: 'http://example.com/nolikes',
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Nobody',
    url: 'http://example.com/notitle',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'A blog with no url',
    author: 'Nobody',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted by its creator', async () => {
  const newBlog = {
    title: 'Blog to delete',
    author: 'Root',
    url: 'http://example.com/delete',
    likes: 0,
  }

  const created = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  const blogsAtStart = await api.get('/api/blogs')

  await api
    .delete(`/api/blogs/${created.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)

  const ids = blogsAtEnd.body.map(b => b.id)
  assert.ok(!ids.includes(created.body.id))
})

test('the likes of a blog can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]

  const updated = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: blogToUpdate.likes + 1 })
    .expect(200)

  assert.strictEqual(updated.body.likes, blogToUpdate.likes + 1)
})

after(async () => {
  await mongoose.connection.close()
})