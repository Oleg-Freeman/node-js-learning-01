const fs = require('fs/promises');

// fs.readFile('./file.txt').then(data => console.log(data.toString())).catch(e => console.log(e))

// fs.appendFile('./file.txt', 'Test append file').then(data => console.log(data)).catch(e => console.log(e))

fs.writeFile('./file.txt', 'Test write file').then(data => console.log(data)).catch(e => console.log(e))

fs.readFile('./file.txt').then(data => console.log(data.toString())).catch(e => console.log(e))


