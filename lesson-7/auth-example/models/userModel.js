const { Schema, model } = require('mongoose');
const { emailRegEx, passwordRegEx } = require('../constants');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            match: [emailRegEx, 'Not valid email'],
            required: true,
        },
        password: {
            type: String,
            match: [passwordRegEx, 'Not valid email'],
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

module.exports = User;
