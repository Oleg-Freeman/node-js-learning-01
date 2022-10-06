const express = require('express');
const logger = require('morgan');
const { booksRouter, authControler, userController } = require('./controllers');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/api/auth', authControler);
app.use('/api/books', booksRouter);
app.use('/api/users', userController);

app.use(async function (req, res) {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.use(function (err, req, res, next) {
    const { status = 500, message = 'Internal server error' } = err;
    console.error(err);
    res.status(status).json({ message });
});

module.exports = app;
