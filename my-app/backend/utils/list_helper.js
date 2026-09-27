const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const top = blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav))
  return {
    title: top.title,
    author: top.author,
    likes: top.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const counts = {}
  blogs.forEach((blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })
  let top = { author: null, blogs: 0 }
  Object.keys(counts).forEach((author) => {
    if (counts[author] > top.blogs) {
      top = { author, blogs: counts[author] }
    }
  })
  return top
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const likes = {}
  blogs.forEach((blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
  })
  let top = { author: null, likes: -1 }
  Object.keys(likes).forEach((author) => {
    if (likes[author] > top.likes) {
      top = { author, likes: likes[author] }
    }
  })
  return top
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
