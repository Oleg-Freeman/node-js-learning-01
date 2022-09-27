const { Book } = require('../models');
const { createError } = require('../helpers');

async function createBook(body) {
    // return Book.create({ ...body, favorite: Boolean(body.favorite)});
    // return Book.create({ ...body, favorite: !!body.favorite});
    return Book.create(body);
}

async function getBookById(id) {
    // const book = await Book.findOne({ _id: id });
    // getCash()
    const book = await Book.findById(id);

    if (!book) {
        throw createError(404, 'Book not found');
    }

    return book;
}

async function getBooks() {
    // return Book.find();
    // return Book.find({ title: "Node learning" }, "title author");
    return Book.find({ title: 'Node learning' }, '-title -author');
}

async function deleteBook(id) {
    await getBookById(id);
    await Book.findByIdAndDelete(id);
}

async function updateBook(id, body) {
    await getBookById(id);

    return Book.findByIdAndUpdate(id, body, { new: true  });
}

module.exports = {
    createBook,
    getBookById,
    getBooks,
    deleteBook,
    updateBook
};
