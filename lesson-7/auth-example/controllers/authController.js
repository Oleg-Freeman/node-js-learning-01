const { Router } = require('express');
const { validateSchema } = require('../helpers');
const { registerSchema, loginSchema } = require('../schemas');
const { register, login } = require('../services');

const router = Router();

router.post('/register', async (req, res, next) => {
    try {
        validateSchema(registerSchema, req.body);

        const user = await register(req.body);
        // const { password, ...user } = result.toObject();

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        validateSchema(loginSchema, req.body);

        const result = await login(req.body);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
