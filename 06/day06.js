"use strict";
exports.__esModule = true;
exports.loadFile = void 0;
var fs = require("fs")
function run_01() {
    var txt = fs.readFileSync("./06/day06.txt", "utf8")
    var lines = txt.split('\r\n')
    var [times, dists] = lines.map(l => l.split(/\s+/).map(s => +s));
    times.splice(0, 1)
    dists.splice(0, 1)
    console.log(times, dists);
    var pos = 1;
    for (var i = 0; i < times.length; i++) {
        var min = Math.ceil(dists[i] / times[i])
        var max = times[i] - min
        console.log(min, max)
        while (min * (times[i] - min) - dists[i] < 1) {
            min += 1;
        }
        while (max * (times[i] - max) - dists[i] < 1) {
            max -= 1;
        }
        pos = pos * (max - min + 1);
    }
    return pos
}

function run_02() {
    var txt = fs.readFileSync("./06/day06.txt", "utf8")
    var lines = txt.split('\r\n')
    var [times, dists] = lines.map(l => l.split(':').map(s => s.replace(/\s+/g, '')));
    times.splice(0, 1)
    dists.splice(0, 1)
    console.log(times, dists);
    var pos = 1;
    for (var i = 0; i < times.length; i++) {
        var min = Math.ceil(dists[i] / times[i])
        var max = times[i] - min
        console.log(min, max)
        while (min * (times[i] - min) - dists[i] < 1) {
            min += 1;
        }
        while (max * (times[i] - max) - dists[i] < 1) {
            max -= 1;
        }
        pos = pos * (max - min + 1);
    }
    return pos
}

exports.day06_01 = run_01;
exports.day06_02 = run_02;

