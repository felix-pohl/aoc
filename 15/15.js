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

