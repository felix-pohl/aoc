const { Console } = require("console")
var tests = require("./test")
var fs = require("fs")
var path = require("path")

tests.test.test(() => {
    tests.testWithInput(run1, [], run2, [], __filename, 1320, 507769, 145, 269747)
})

function run1(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n')
    var instr = lines[0].split(',');
    return instr.map(HASH).reduce((a, b) => a + b, 0);
}

function run2(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n')
    var instr = lines[0].split(',');
    var boxes = Array.from({ length: 256 }).map(v => []);
    instr.forEach(i => {
        if (i.indexOf('-') != -1) {
            let p = i.split('-');
            let hash = HASH(p[0]);
            let label = p[0]
            var index = boxes[hash].findIndex(l => l.label === label);
            if (index != -1) {
                boxes[hash].splice(index, 1);
            }
        }
        if (i.indexOf('=') != -1) {
            let p = i.split('=');
            let hash = HASH(p[0])
            let label = p[0]
            let focalLength = +p[1];
            var index = boxes[hash].findIndex(l => l.label === label);
            if (index != -1) {
                boxes[hash][index] = { label, focalLength }
            } else {
                boxes[hash].push({ label, focalLength })
            }
        }
    })
    return boxes.reduce((a, b, i) => {
        return a + b.reduce((j, k, idx) => {
            return j + ((i + 1) * (idx + 1) * k.focalLength);
        }, 0)
    }, 0)
}

function HASH(line) {
    return line.split('').reduce((a, b) => {
        a += b.charCodeAt(0);
        a *= 17;
        a %= 256;
        return a;
    }, 0)
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

