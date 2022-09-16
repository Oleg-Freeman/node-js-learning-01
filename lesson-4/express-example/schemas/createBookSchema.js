const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string()
        .min(2)
        .pattern(/^[a-z ,.'-]+$/i)
        .required(),
});

module.exports = schema;
