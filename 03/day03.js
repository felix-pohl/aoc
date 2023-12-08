"use strict";
exports.__esModule = true;
exports.loadFile = void 0;
var fs = require("fs")
function run() {
    var txt = fs.readFileSync("./03/day03.txt", "utf8")
    const grid = txt.split('\r\n').map(l => l.split(''));
    const collectedNumbers = new Map();
    const collectedSymbols = [];
    for (var i = 0; i < grid.length; i++) {
        var number = '';
        var start = undefined;
        var end = undefined;
        for (var j = 0; j < grid[i].length; j++) {
            if (isNumber(grid[i][j])) {
                number += grid[i][j]
                start = start ?? j
            } else {
                end = j - 1
                if (start !== undefined) {
                    const num = { nr: number }
                    while (start <= end) {
                        collectedNumbers.set(key(start, start, i), num)
                        start++;
                    }
                }
                number = '';
                start = undefined
                end = undefined
                if (grid[i][j] != '.') {
                    collectedSymbols.push([j, i, grid[i][j], key(j, j, i)])
                }
            }
        }
        end = j
        if (start !== undefined) {
            const num = { nr: number }
            while (start <= end) {
                collectedNumbers.set(key(start, start, i), num)
                start++;
            }
        }
        number = '';
        start = undefined
        end = undefined
    }
    const gears = collectedSymbols.filter(t => t[2] === '*');
    const newLocal = gears.map(g => neightbours(g, collectedNumbers))
        .map(s => Array.from(s.values())
            .filter(Boolean).map(a => a.nr));
    const ratios = newLocal
        .filter(n => n.length == 2).map(n => n.reduce(multiply, 1)).reduce(sum, 0)
    console.log(ratios)
}

function neightbours(gear, numbers) {
    const x = gear[0]
    const y = gear[1]
    const n = new Set();
    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            const keyv = key(i, i, j);
            n.add(numbers.get(keyv))
        }
    }
    return n
}

function key(start, end, i) {
    return `l${i}s${start}e${end}`
}

function sum(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function isNumber(s) {
    return Number.isInteger(Number.parseInt(s));
}

function hasAjacentSymbol(start, end, lineIndex, grid) {
    if (end === undefined || start === undefined || lineIndex === undefined) {
    }
    var searchLineStart = Math.max(start - 1, 0);
    var searchLineEnd = Math.min(end + 1, grid[lineIndex].length - 1)
    var searchColStart = Math.max(lineIndex - 1, 0)
    var searchColEnd = Math.min(lineIndex + 1, grid.length - 1)
    for (var i = searchLineStart; i <= searchLineEnd; i++) {
        for (var j = searchColStart; j <= searchColEnd; j++) {
            if (isSymbol(grid[j][i])) {
                return true
            }
        }
    }
}

function isSymbol(s) {
    return !isNumber(s) && s !== '.';
}

exports.day03 = run;