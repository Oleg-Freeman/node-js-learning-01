const { getAll, getById, addBook, deleteBook, updateBook } = require('./books');
const { program } = require('commander');
// const yargs = require('yargs/yargs');
// const { hideBin } = require('yargs/helpers');

// const argv = yargs(hideBin(process.argv)).argv;

program
  .option('-a, --action <type>')
  .option('-t, --title <type>')
  .option('-au, --author <type>')
  .option('-i, --id <type>');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, title, author }) {
    switch (action) {
        case 'getAll': {
            const books = await getAll();
            console.log(books);
            break;
        }
        case 'getById': {
            const book = await getById(id);
            console.log(book)
            break;
        }
        case 'add': {
            const book = await addBook(title, author);
            console.log(book)
            break;
        }
        case 'delete': {
            const book = await deleteBook(id);
            console.log(book);
            break;
        }
        case 'update': {
            const book = await updateBook(id, title, author);
            console.log(book);
            break;
        }
        default: console.log('Unknown action')
    }
}

// invokeAction({ action: 'getAll'})
// invokeAction({ action: 'getById', id: 'u9kgwNWGi3uUUwh0b8V49'})
// invokeAction({ action: 'add', title: 'Learn Node.js 2', author: 'Clever Guy'});
// invokeAction({ action: 'delete', id: '1ccb21a0-7581-4c81-b0c1-49f6aad6196c'})
// invokeAction({ action: 'update', id: 'u9kgwNWGi3uUUwh0b8V49', title: 'Learn Node.js 2', author: 'Clever Guy'});
// console.log(argv)
invokeAction(argv);
