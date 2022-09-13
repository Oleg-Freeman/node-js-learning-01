const express = require('express')
const { getAll, addBook } = require('./books')
const fs = require('fs/promises')
const cors = require('cors')

const app = express()

async function logRequest(req, res, next) {
    console.log('Log added');
    await fs.appendFile('./server.log', `${req.method} ${req.url} ${Date()}\n`)
    next()
}

app.use(express.json())
app.use(cors())
app.use('/books', logRequest)

app.get('/', function (req, res) {
  res.send('<h1>Hello World</h1>')
})

app.get('/books',  async function (req, res) {
    const books = await getAll();

    res.json(books)
})

app.post('/books', async function (req, res) {
    const { title, author } = req.body;
    const book = await addBook(title, author);

    res.status(201).json(book)
})

app.use('*', async function(req, res) {
    // res.status(404).send('<h1>Page Not Found</h1>')
    res.status(404).sendFile('./index.html')
})

app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send('Something broke!');
});

app.listen(5000, () => console.log('Server started'))

// /getAllBooksFromUser
// /products/:productId/users/:userId/comments/product
// /products/:productId/users