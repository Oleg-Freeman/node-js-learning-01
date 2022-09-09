const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const booksPath = path.join(__dirname, 'books.json'); // folder1/folder2/folder3

async function getAll() {
    const result = await fs.readFile(booksPath);

    return JSON.parse(result);
}

async function getById(bookId) {
    const books = await getAll();
    const book = books.find(({id}) => id === bookId);

    if (!book) {
        throw new Error('Book not found');
    }

    return book;
}

async function addBook(title, author) {
    const books = await getAll();
    const newBook = {
        id: uuid(),
        title, 
        author
    }

    books.push(newBook);

    fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    return newBook;
}

async function deleteBook(bookId) {
    const books = await getAll();
    const index = books.findIndex(({id}) => id === bookId);

    if (index === -1) {
        throw new Error('Book not found');
    }

    const [result] = books.splice(index, 1);

    fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    return result;
}

async function updateBook(bookId, title, author) {
    const books = await getAll();
    const index = books.findIndex(({id}) => id === bookId);

    if (index === -1) {
        throw new Error('Book not found');
    }

    books[index].title = title;
    books[index].author = author;

    fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    return books[index];
}

module.exports = {
    getAll,
    getById,
    addBook,
    deleteBook,
    updateBook
}