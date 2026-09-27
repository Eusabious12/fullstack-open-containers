const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://example.com/goto', likes: 5, __v: 0 },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://example.com/canonical', likes: 12, __v: 0 },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://example.com/first', likes: 10, __v: 0 },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://example.com/tdd', likes: 0, __v: 0 },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://example.com/typewars', likes: 2, __v: 0 },
]

test('dummy returns one', () => {
  assert.strictEqual(listHelper.dummy([]), 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 7)
  })
  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favorite blog', () => {
  test('is the one with most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('is the author with the most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('is the author with the most total likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
