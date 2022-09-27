const createError = require('./createError');

function validateSchema(schema, targed) {
    const { error } = schema.validate(targed);

    if (error) {
        console.error(error);

        throw new createError(400, error.message);
    }
}

module.exports = validateSchema;
