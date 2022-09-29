const UserService = require('./bookService');
const AuthService = require('./authService');

module.exports = {
    ...UserService,
    ...AuthService,
};
