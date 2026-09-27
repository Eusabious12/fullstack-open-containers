const STORAGE_KEY = 'loggedBloglistUser'

const getUser = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

const saveUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}

export default { getUser, saveUser, removeUser }