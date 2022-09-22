const { Router } = require('express');
const { createBook, getBookById, getBooks, deleteBook, updateBook } = require('../services')
const { createBookSchema, objectIdSchema } = require('../schemas');

const router = Router();

router.get('/', async function (req, res, next) {
    try {
        const books = await getBooks();

        res.json(books);
    } catch (error) {
        next(error);
    }
});

router.post('/', async function (req, res, next) {
    try {
        const { error } = createBookSchema.validate(req.body);

        if (error) {
            console.error(error);
            next(error);
        }

        const book = await createBook(req.body);

        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
});


router.get('/:id', async function (req, res, next) {
    try {
        const { error } = objectIdSchema.validate(req.params.id);

        if (error) {
            console.error(error);
            next(error);
        }

        const book = await getBookById(req.params.id);

        res.json(book);
    } catch (error) {

        next(error);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        const { error: idError } = objectIdSchema.validate(req.params.id);

        if (idError) {
            console.error(idError);
            next(idError);
        }

        const { error: bodyError } = createBookSchema.validate(req.body);

        if (bodyError) {
            console.error(bodyError);
            next(bodyError);
        }

        const book = await updateBook(req.params.id, req.body);

        res.json(book);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const { error } = objectIdSchema.validate(req.params.id);

        if (error) {
            console.error(error);
            next(error);
        }

        await deleteBook(req.params.id);

        res.status(203).json();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
