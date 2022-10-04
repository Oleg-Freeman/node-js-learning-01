const { Router } = require('express');
const { upload, checkAuth } = require('../middlewares');
const { uploadAvatar } = require('../services');

const router = Router();

router.patch(
    '/avatars',
    checkAuth,
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            const user = await uploadAvatar(req.user.id, req.file);

            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
