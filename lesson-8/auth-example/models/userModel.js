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
            match: [passwordRegEx, 'Not valid password'],
            required: true,
        },
        token: String,
        // firstLogin: Date
    },
    { versionKey: false, timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
