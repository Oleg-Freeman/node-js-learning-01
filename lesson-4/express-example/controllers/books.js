const { Router } = require('express');
const {
    getAll,
    addBook,
    getById,
    updateBook,
    deleteBook,
} = require('../models/books');
const { createBookSchema } = require('../schemas');

const router = Router();

router.get('/', async function (req, res, next) {
    try {
        const books = await getAll();

        res.json(books);
    } catch (error) {
        next(error);
    }
});

router.post('/', async function (req, res, next) {
    try {
        const { title, author } = req.body;
        const { error } = createBookSchema.validate(req.body);

        if (error) {
            console.error(error);
            next(error);
        }

        const book = await addBook(title, author);

        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
});

// /api/books/:id
router.get('/:id', async function (req, res, next) {
    try {
        const book = await getById(req.params.id);

        res.json(book);
    } catch (error) {
        // console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        const { title, author } = req.body;
        const book = await updateBook(req.params.id, title, author);

        res.json(book);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        // const book = await deleteBook(req.params.id);

        // res.json(book);
        await deleteBook(req.params.id);

        res.status(203).json();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
