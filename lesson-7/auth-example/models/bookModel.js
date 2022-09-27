const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        genre: {
            type: String,
            enum: ['fantasy', 'classic'],
            required: true,
        },
        isbn: {
            // 5-02-013850-9
            type: String,
            match: /[0-9]{1}-[0-9]{2}-[0-9]{6}-[0-9]{1}/,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

const Book = model('Book', bookSchema);
// categories -> category
// mise -> mouse

module.exports = Book;
