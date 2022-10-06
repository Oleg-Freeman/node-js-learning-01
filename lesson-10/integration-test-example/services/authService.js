const { User } = require('../models');
const { createError } = require('../helpers');
const { notValidCredentials } = require('../constants');
const { jwtSecret } = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

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
        avatarURL: gravatar.url(email),
    });

    const { password: newUserPassword, ...newUser } = result.toObject();

    return newUser;
}

async function login(body) {
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user) {
        throw createError(401, notValidCredentials);
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match);


    if (!match) {
        throw createError(401, notValidCredentials);
    }

    const { password: pass, ...existingUser } = user.toObject();
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '7 days' });

    await User.findByIdAndUpdate(user.id, { token }, { new: true });

    return {
        user: existingUser,
        token,
    };
}

async function logout(id) {
    await User.findByIdAndUpdate(id, { token: '' });
}

module.exports = {
    register,
    login,
    logout,
};
