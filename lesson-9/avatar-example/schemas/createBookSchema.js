const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string()
        .min(2)
        .pattern(/^[a-z ,.'-]+$/i)
        .required(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid('fantasy', 'classic').required(),
    isbn: Joi.string().regex(/[0-9]{1}-[0-9]{2}-[0-9]{6}-[0-9]{1}/).required()
});

module.exports = schema;
