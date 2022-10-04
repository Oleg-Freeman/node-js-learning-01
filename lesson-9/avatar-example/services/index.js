const BookService = require('./bookService');
const AuthService = require('./authService');
const UserService = require('./userService');

module.exports = {
    ...BookService,
    ...AuthService,
    ...UserService,
};
