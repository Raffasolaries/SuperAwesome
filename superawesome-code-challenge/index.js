const fs = require('fs'),
    lineReader = require('line-reader');



/* fs.readFile('./task/data/example1.txt', 'utf8', (err, contents) => {
    console.info(contents);
}); */
// 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229
// Mapping letters with prime numbers
var map = {
    a: 2, b: 3, c: 5, d: 7, e: 11, f: 13, g: 17, h: 19, i: 23, j: 29, k: 31, l: 37, m: 41, n: 43, o: 47, p: 53, q: 59, r: 61, s: 67, t: 71, u: 73, v: 79, w: 83, x: 89, y: 97, z: 101
};

var findAnagram = (lengths, item) => {
    let res = []; 
    if (item.str.length in lengths) {
        res = lengths[item.str.length].filter(lengthsItem => lengthsItem.value === item.value);
    }
    /* for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].value && arr[i][j].value === item.value) {
                return i;
            }
        }
    } */
    return res;
}

var AnagramGroups = (path) => {
    if (fs.existsSync(path)) {
        let countStrings = 0; // counting lines with letters
        let resObj = [];
        let lengths = {};
        let group = {};
        lineReader.eachLine(path, (line, last) => {
            if (line) {
                if (/^[a-zA-Z]+$/.test(line)) {
                    let anagrams = [];
                    let value = 1;
                    ++countStrings;
                    // group[line.length+'.'+countStrings] = line;
                    for (let i = 0; i < line.length; i++) {
                        value *= map[line[i]];
                    }
                    let item = { [value]: [line] };
                    if (line.length in lengths) {
                        if (value in lengths[line.length]) {
                            lengths[line.length][value].push(line);
                        } else {
                            Object.assign(lengths[line.length], item);
                        }
                    } else {
                        Object.assign(lengths, {
                            [line.length]: item
                        });
                    }
                }
                if (last && countStrings < 2) {
                    console.error('This file doesn\'t contain letters');
                    return false;
                } else if (last) {
                    console.info(lengths);
                    for (let key in lengths) {
                        for (let anagrams in lengths[key]) {
                            resObj.push(lengths[key][anagrams]);
                        }
                    }
                    console.info(JSON.stringify(resObj));
                    // console.info('res', JSON.stringify(resObj.map(group => group.map(item => item.str))));
                    return false; // stop reading
                }
            }
        });
    } else {
        console.error('File path doesn\'t exist');
    }
}

AnagramGroups('./task/data/example1.txt');