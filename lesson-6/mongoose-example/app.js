const express = require('express');
const logger = require('morgan');
const { booksRouter } = require('./controllers');
const cors = require('cors');
require('./config');
const { connect } = require('mongoose');
const { mongoURL, port } = require('./config');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/books', booksRouter);

app.use(async function (req, res) {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.use(function (err, req, res, next) {
    const { status = 500, message = 'Internal server error' } = err;
    console.error(err);
    res.status(status).json({ message });
});

connect(mongoURL)
    .then(() => {
        console.log('MongoDB connected');

        app.listen(port, () =>
            console.log(`Server started on http://localhost:${port}`)
        );
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });
