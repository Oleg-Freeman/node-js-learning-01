const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.dev' });

const app = require('../app');
const { User } = require('../models');
const { PORT, MONGO_URL } = process.env;

describe('test auth routes', () => {
    let server;
    beforeAll(() => (server = app.listen(PORT)));
    afterAll(() => server.close());

    beforeEach((done) => {
        mongoose.connect(MONGO_URL).then(() => done());
    });

    // afterEach((done) => {
    //     mongoose.connection.db.dropCollection(() => {
    //         mongoose.connection.close(() => done());
    //     });
    // });

    test('test login route', async () => {
        const password = '123456aA.';
        const email = 'test3@gmail.com';
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = {
            email,
            password: hash,
            name: 'John Smith',
            avatarURL: 'test',
        };

        const user = await User.create(newUser);

        /*
        1. Перевірити правильність відповіді на HTTP-запит
        2. Перевірити, що в базу записався потрібний елемент
        */

        const loginUser = {
            email,
            password,
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(loginUser);
        expect(response.statusCode).toBe(200);
        const { body } = response;
        console.log(body.token);
        expect(body.token).not.toBe(undefined);
        const { token } = await User.findById(user._id);
        expect(body.token).toBe(token);
    });
});
