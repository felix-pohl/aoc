"use strict";
exports.__esModule = true;
exports.loadFile = void 0;
var fs = require("fs")
function run() {
    var txt = fs.readFileSync("./02/day02.txt", "utf8")
    return txt.split('\r\n').map(l => {
        var sl = l.split(': ');
        var gn = Number.parseInt(sl[0].substring(4))
        var rounds = sl[1].split('; ');
        for (var i = 0; i < rounds.length; i++) {
            var max = [12, 13, 14];
            var colors = ['red', 'green', 'blue']
            var dice = rounds[i].split(', ')
            for (var j = 0; j < dice.length; j++) {
                for (var c = 0; c < 3; c++) {
                    if (dice[j].split(" ")[1] == colors[c]
                        && dice[j].split(" ")[0] > max[c]) {
                        return [gn, false, rounds[i], dice[j]];
                    }
                }
            }
        }
        return [gn, true, rounds[i],];
    }).reduce((a, b) => b[1] ? a + b[0] : a, 0)
}

function run2() {
    var txt = fs.readFileSync("./02/day02.txt", "utf8")
    return txt.split('\r\n').map(l => {
        var sl = l.split(': ');
        var gn = Number.parseInt(sl[0].substring(4))
        var rounds = sl[1].split('; ');
        var roundMax = [0, 0, 0]
        for (var i = 0; i < rounds.length; i++) {
            var colors = ['red', 'green', 'blue']
            var dice = rounds[i].split(', ')
            for (var j = 0; j < dice.length; j++) {
                for (var c = 0; c < 3; c++) {
                    if (dice[j].split(" ")[1] == colors[c]) {
                        roundMax[c] = Math.max(roundMax[c], dice[j].split(" ")[0])
                    }
                }
            }
        }
        return roundMax.reduce((a, b) => a * b, 1);
    }).reduce((a, b) => a + b, 0)
}

exports.day02 = run;
exports.day02_2 = run2;