const { Router } = require('express');
const { validateSchema } = require('../helpers');
const { registerSchema, loginSchema, emailSchema } = require('../schemas');
const {
    register,
    login,
    logout,
    confirmEmail,
    resendEmail,
} = require('../services');
const { checkAuth } = require('../middlewares');

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

router.patch('/logout', checkAuth, async (req, res, next) => {
    try {
        const { user } = req;
        await logout(user.id);

        res.status(203).json({ message: 'Logged out' });
    } catch (error) {
        next(error);
    }
});

router.get('/verify/:verificationToken', async (req, res, next) => {
    try {
        await confirmEmail(req.params.verificationToken);

        res.json({ message: 'Verification complete' });
    } catch (error) {
        next(error);
    }
});

router.post('/verify', async (req, res, next) => {
    try {
        validateSchema(emailSchema, req.body);

        await resendEmail(req.body.email);

        res.json({ message: 'Email resent' })
    } catch (error) {
        next(error);
    }
});

module.exports = router;
