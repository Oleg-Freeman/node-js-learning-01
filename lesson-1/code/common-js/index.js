// const users = require('./users/users')
// const getPosts = require('./users/posts')

const { users } = require('./users')
require('./users').getPosts()

console.log(users);