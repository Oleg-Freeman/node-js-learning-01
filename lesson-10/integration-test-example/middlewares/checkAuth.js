const { jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');
const { createError } = require('../helpers');
const { User } = require('../models');

async function checkAuth(req, res, next) {
    try {
        const { authorization = '' } = req.headers;
        // console.log(authorization);
        const [bearer, token] = authorization.split(' ');
        // console.log(token);

        if (bearer !== 'Bearer') {
            throw createError(401, 'Unauthorized');
        }

        const { id } = jwt.verify(token, jwtSecret);
        console.log(id);
        const user = await User.findById(id);

        if (!user || !user.token || token !== user.token) {
            throw createError(401, 'Unauthorized');
        }

        req.user = user

        next();
    } catch (error) {
        const authError = createError(
            error.status || 401,
            error.message || 'Unauthorized'
        );
        next(authError);
    }
}

module.exports = checkAuth;
