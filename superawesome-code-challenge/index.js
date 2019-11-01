var fs = require('fs');


fs.readFile('./task/data/example1.txt', 'utf8', (err, contents) => {
    console.info(contents);
});