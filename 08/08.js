const { Console } = require("console")
var tests = require("./test")
var fs = require("fs")
var path = require("path")

tests.test.test(() => {
    tests.testWithInput(run1, [], run2, [], __filename, 2, 12083, 6, 13385272668829)
})

function* gen(line) {
    let i = 0
    while (true) {
        yield line[i] === 'L' ? 0 : 1;
        i++;
        if (i >= line.length) {
            i = 0;
        }
    }
}

function run1(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n')
    var [dirs, _, ...mapString] = lines;
    var map = new Map();
    mapString.forEach(l => map.set(l.substring(0, 3), [l.substring(7, 10), l.substring(12, 15)]))
    var zone = "AAA";
    var dirGen = gen(dirs);
    var steps = 0;
    while (zone !== "ZZZ") {
        steps++;
        var d = dirGen.next().value;
        zone = map.get(zone)[d];
    }
    return steps;
}

function run2(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n')
    var [dirs, _, ...mapString] = lines;
    var map = new Map();
    mapString.forEach(l => map.set(l.substring(0, 3), [l.substring(7, 10), l.substring(12, 15)]))
    var zones = [];
    map.forEach((v, k) => zones.push(k));
    zones = zones.filter(k => k.endsWith('A'));
    var dirGen = gen(dirs);
    var steps = 0;
    zIndices = zones.map(v => []);
    while (!zones.every(z => z.endsWith('Z')) && !zIndices.every(w => w.length > 2)) {
        steps++;
        var d = dirGen.next().value;
        zones = zones.map(zone => map.get(zone)[d]);
        zones.forEach((z, i) => {
            if (z.endsWith('Z')) {
                zIndices[i].push(steps)
            }
        })
    }
    console.log(zIndices)
    var options = zIndices.map(r => r[0])
    return LCM(options);
}

function LCM(arr) {
    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }

    let res = arr[0];

    for (let i = 1; i < arr.length; i++) {
        res = (res * arr[i]) / gcd(res, arr[i]);
    }

    return res;
} 
