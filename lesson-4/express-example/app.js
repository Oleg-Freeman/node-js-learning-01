const express = require('express');
const logger = require('morgan');
const { booksRouter } = require('./controllers');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

function testFunc(req, res, next) {
    next()
}

app.use('/api/books', testFunc, booksRouter);
app.use('/api/users', testFunc, booksRouter);
app.use('/api/orders', testFunc, booksRouter);

app.use(async function (req, res) {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.use(function (err, req, res, next) {
    const { status = 500, message = 'Internal server error' } = err;
    console.error(err);
    res.status(status).json({ message });
});

app.listen(5000, () => console.log('Server started'));
