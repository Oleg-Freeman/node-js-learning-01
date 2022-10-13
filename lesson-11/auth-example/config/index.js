const ENV = process.env.NODE_ENV || 'dev';
require('dotenv').config({ path: `.env.${ENV}` });

const { MONGO_URL, PORT, JWT_SECRET, SEND_GRID_API_KEY } = process.env;

module.exports = {
    port: Number(PORT) || 5000,
    mongoURL: MONGO_URL,
    jwtSecret: JWT_SECRET,
    sendgridApiKey: SEND_GRID_API_KEY
};
