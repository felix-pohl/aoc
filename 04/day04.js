"use strict";
exports.__esModule = true;
exports.loadFile = void 0;


var fs = require("fs")
function run_01() {
    var txt = fs.readFileSync("./04/day04.txt", "utf8")
    return txt.split('\n')
        .map(l => l.split(':')[1])
        .filter(Boolean)
        .map(l => l.split('|'))
        .map(l => l[0].split(' ')
            .filter(s => s !== '')
            .map(s => +s)
            .filter(n => l[1].split(' ')
                .filter(s => s !== '')
                .map(s => +s)
                .indexOf(n) != -1
            )
        )
        .map(l => l.length == 0 ? 0 : 1 * 2 ** (l.length - 1))
        .reduce((a, b) => a + b, 0)
}

function run_02() {
    var txt = fs.readFileSync("./04/day04.txt", "utf8")
    const wins = txt.split('\n')
        .map(l => l.split(':')[1])
        .filter(Boolean)
        .map(l => l.split('|'))
        .map(l => l[0].split(' ')
            .filter(s => s !== '')
            .map(s => +s)
            .filter(n => l[1].split(' ')
                .filter(s => s !== '')
                .map(s => +s)
                .indexOf(n) != -1
            )
        )
        .map(l => l.length);
    const cards = Array.from({ length: wins.length }).map(l => 1);
    wins.forEach((win, index) => {
        for (var i = index + 1; i <= index + win; i++) {
            cards[i] += cards[index];
        }
    })
    return cards.reduce((a, b) => a + b, 0);
}

exports.day04_01 = run_01;
exports.day04_02 = run_02;