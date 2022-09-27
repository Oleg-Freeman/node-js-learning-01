const { User } = require('../models');
const { createError } = require('../helpers');
const { notValidCredentials } = require('../constants');
const bcrypt = require('bcryptjs');

async function register(body) {
    const { name, email, password } = body;
    const user = await User.findOne({ email });

    if (user) {
        throw createError(409, 'Email aready exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const result = await User.create({
        name,
        email,
        password: hash,
    });

    const { password: newUserPassword, ...newUser } = result.toObject()

    return newUser;
}

async function login(body) {
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user) {
        throw createError(401, notValidCredentials);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw createError(401, notValidCredentials);
    }

    const { password: existingUserPassword, ...existingUser } = user.toObject()

    return {
        user: existingUser,
        token: '4gg5g5g55g56g5',
    };
}

module.exports = {
    register,
    login
};
