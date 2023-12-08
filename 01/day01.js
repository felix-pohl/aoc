"use strict";
exports.__esModule = true;
exports.loadFile = void 0;
var fs = require("fs")
function run() {
    var txt = fs.readFileSync("./01/day01.txt", "utf8")
    return txt.split('\n').map(l => {
        const numbers = []
        while (l.length > 0) {
            var c = l[0];
            if (Number.isInteger(Number.parseInt(c))) {
                numbers.push(Number.parseInt(c))
            } else {
                var n = lexicalNumber(l)
                if (n !== undefined) {
                    numbers.push(n)
                }
            }
            l = l.slice(1);
        }
        return numbers;
    }).map(a => +(a[0] + '' + a[a.length - 1]))
        .reduce((a, b) => a + b, 0);
}

/**
 * 
 * @param {string} s 
 */
function lexicalNumber(s) {
    var nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    for (var i = 0; i < nums.length; i++) {
        if (s.startsWith(nums[i])) {
            return i + 1
        }
    }
}

exports.day01 = run;