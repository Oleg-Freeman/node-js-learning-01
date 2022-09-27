const ENV = process.env.NODE_ENV || 'dev';
require('dotenv').config({ path: `.env.${ENV}` });

const { MONGO_URL, PORT } = process.env;

module.exports = {
    port: Number(PORT) || 5000,
    mongoURL: MONGO_URL,
};
