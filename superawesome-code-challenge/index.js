const fs = require('fs'),
    lineReader = require('line-reader'),
    bigInt = require("big-integer");

// Mapping the Alphabeth with Prime Numbers
var map = {
    a: 2, b: 3, c: 5, d: 7, e: 11, f: 13, g: 17, h: 19, i: 23, j: 29, k: 31, l: 37, m: 41, n: 43, o: 47, p: 53, q: 59, r: 61, s: 67, t: 71, u: 73, v: 79, w: 83, x: 89, y: 97, z: 101
};

var AnagramGroups = (path) => {
    // if path exists
    if (fs.existsSync(path)) {
        let countStrings = 0; // counting lines with letters
        let anagrams = {};
        lineReader.eachLine(path, (line, last) => {
            // if the current line is not undefined or empty
            if (line) {
                // if current line contains letters
                if (/^[a-zA-Z]+$/.test(line)) {
                    let value = 1;
                    ++countStrings;
                    for (let i = 0; i < line.length; i++) {
                        value = bigInt(value).multiply(map[line[i]]);
                    }
                    [value] in anagrams ? 
                        anagrams[value].push(line) : Object.assign(anagrams, { [value]: [line] });
                }
                // if lines with letters are more than one
                if (last && countStrings < 2) {
                    console.error('This file doesn\'t contain letters');
                    return false;
                } else if (last) {
                    for (let key in anagrams) {
                        console.info(anagrams[key]);
                    }
                    return false; // stop reading
                }
            }
        });
    } else {
        console.error('File path doesn\'t exist');
    }
}

AnagramGroups('./task/data/example2.txt');