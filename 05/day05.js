"use strict";
exports.__esModule = true;
exports.loadFile = void 0;

var fs = require("fs")
function run_01() {
    var txt = fs.readFileSync("./05/day05.txt", "utf8")
    var lines = txt.split('\n')
    var seedline = lines.splice(0, 1)[0];
    var seeds = seedline.substring(7).split(' ').map(s => +s);
    var converted = seeds;
    var missed = []
    seeds = []
    for (var line of lines) {
        if (line.length < 5) {
            for (var seed of seeds) {
                converted.push(seed)
            }
            continue;
        }
        if (line.indexOf('to') !== -1) {
            seeds = converted;
            converted = [];
            continue;
        }
        var [dest, source, range] = line.split(' ').map(s => +s);
        for (var seed of seeds) {
            if (seed >= source && seed < (source + range)) {
                converted.push(seed - source + dest);
            } else {
                missed.push(seed);
            }
        }
        seeds = missed;
        missed = [];
    }
    return Math.min(...converted);
}

function run_02() {
    var txt = fs.readFileSync("./05/day05.txt", "utf8")
    var lines = txt.split('\n')
    var seedline = lines.splice(0, 1)[0];
    var seeds = seedline.substring(7).split(' ').map(s => +s);
    var pairwise = []
    for (var i = 0; i < seeds.length; i += 2) {
        pairwise.push([seeds[i], seeds[i] + seeds[i + 1] - 1])
    }
    seeds = pairwise;
    var converted = seeds;
    var missed = []
    seeds = []
    for (var line of lines) {
        if (line.length < 5) {
            for (var seed of seeds) {
                converted.push(seed)
            }
            continue;
        }
        if (line.indexOf('to') !== -1) {
            seeds = converted;
            converted = [];
            continue;
        }
        var [dest, sourceStart, range] = line.split(' ').map(s => +s);
        for (var seed of seeds) {
            var [seedStart, seedEnd] = seed;
            var sourceEnd = sourceStart + range - 1;
            var distance = - sourceStart + dest;
            if (seedStart > sourceEnd || seedEnd < sourceStart) {
                missed.push(seed);
            } else {
                var leftOffset = sourceStart - seedStart;
                var rightOffset = sourceEnd - seedEnd;
                if (leftOffset > 0) {
                    missed.push([seedStart, seedStart + leftOffset - 1])
                    seedStart = seedStart + leftOffset;
                }
                if (rightOffset < 0) {
                    missed.push([seedEnd + rightOffset + 1, seedEnd])
                    seedEnd = seedEnd + rightOffset;
                }
                converted.push([seedStart + distance, seedEnd + distance])
            }
        }
        seeds = missed;
        missed = [];
    }
    return Math.min(...converted.map(a => a[0]));
}

exports.day05_01 = run_01;
exports.day05_02 = run_02;