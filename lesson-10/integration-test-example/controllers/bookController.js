const { Router } = require('express');
const {
    createBook,
    getBookById,
    getBooks,
    deleteBook,
    updateBook,
} = require('../services');
const { createBookSchema, objectIdSchema } = require('../schemas');
const { validateSchema } = require('../helpers');
const { checkAuth } = require('../middlewares');

const router = Router();

router.get('/', checkAuth, async function (req, res, next) {
    try {
        const { limit, offset } = req.query;
        const books = await getBooks({ owner: req.user.id, limit, offset });

        res.json(books);
    } catch (error) {
        next(error);
    }
});

router.post('/', checkAuth, async function (req, res, next) {
    try {
        // const { error } = createBookSchema.validate(req.body);

        // if (error) {
        //     console.error(error);

        //     throw new createError(400, error.message);
        // }
        const { user } = req;

        validateSchema(createBookSchema, req.body);

        const book = await createBook({ ...req.body, owner: user.id });

        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        validateSchema(objectIdSchema, req.params.id);

        const book = await getBookById(req.params.id);

        res.json(book);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        validateSchema(objectIdSchema, req.params.id);

        validateSchema(createBookSchema, req.body);

        const book = await updateBook(req.params.id, req.body);

        res.json(book);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        validateSchema(objectIdSchema, req.params.id);

        await deleteBook(req.params.id);

        res.status(203).json();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
