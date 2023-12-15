const { Console } = require("console")
var tests = require("./test")
var fs = require("fs")
var path = require("path")

tests.test.test(() => {
    tests.testWithInput(run1, [], run2, [], __filename, 136, 109424, 64, 102509)
})

function run1(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n').map(l => l.split(''))
    tilt(lines, -1, 0)
    return lines.map(l => l.join('')).reverse().map(l => l.split('').filter(c => c === 'O').length).reduce((a, b, i) => a + b * (i + 1), 0)
}

function run2(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n').map(l => l.split(''))
    const seenBoards = [],
        boardsIndex = new Map();
    let loopStart, loopEnd;
    const expectedRuns = 1000000000;
    for (let n = 0; n < expectedRuns; n++) {
        const encodedBoard = JSON.stringify(lines);
        if (boardsIndex.has(encodedBoard)) {
            loopStart = boardsIndex.get(encodedBoard);
            loopEnd = n;
            break;
        }
        boardsIndex.set(encodedBoard, n);
        seenBoards.push(encodedBoard);
        spinCycle(lines);
    }
    console.log(loopStart, loopEnd);
    const loopLength = loopEnd - loopStart;
    const loopOffset = (expectedRuns - loopEnd) % loopLength;
    lines = JSON.parse(seenBoards[loopStart + loopOffset]);
    return tally(lines);
}

function tally(lines) {
    return lines.map(l => l.join('')).reverse().map(l => l.split('').filter(c => c === 'O').length).reduce((a, b, i) => a + b * (i + 1), 0)
}

function printRocks(lines) {
    console.log(lines.map(l => l.join('')).join('\r\n'));
    console.log(tally(lines))
    console.log('')
}

function spinCycle(lines) {
    tilt(lines, -1, 0)
    tilt(lines, 0, -1)
    tilt(lines, +1, 0)
    tilt(lines, 0, +1)
}

function tilt(lines, dx, dy) {
    for (let x = 0; x < lines.length; x++) {
        for (let y = 0; y < lines[0].length; y++) {
            slide(x, y, lines, dx, dy)
        }
    }
}

function slide(x, y, lines, dx, dy) {
    if (dx > 0) {
        x = lines.length - 1 - x;
    }
    if (dy > 0) {
        y = lines[0].length - 1 - y;
    }
    while (x >= 0 - dx && y >= 0 - dy && x < lines.length - dx && y < lines[0].length - dy && lines[x][y] == 'O' && lines[x + dx][y + dy] == '.') {
        lines[x][y] = '.'
        lines[x + dx][y + dy] = 'O'
        x = x + dx;
        y = y + dy;
    }
}

