const { Console } = require("console")
var tests = require("./test")
var fs = require("fs")
var path = require("path")

tests.test.test(() => {
    tests.testWithInput(run1, [], run2, [], __filename, 405, 37561, 400, 31108)
})

function run1(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var patterns = txt.split('\r\n\r\n')
    return patterns.map(p => {
        return findMirror(p);
    }).reduce((a, b) => a + b, 0)
}

function run2(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var patterns = txt.split('\r\n\r\n')
    return patterns.map((p, pi) => {
        var originalResult = findMirror(p);
        const lines = p.split('\r\n');
        const l = lines[0].length;
        const r = lines.length;
        for (let i = 0; i < l; i++) {
            for (let j = 0; j < r; j++) {
                var newP = flipSmudge(i, j, l, p);
                var newResult = findMirror(newP, originalResult);
                if (newResult != null && newResult != originalResult) {
                    console.log(pi, 'with result')
                    return newResult;
                }
            }
        }
        console.log(pi, 'no result')
        return 0;
    }).reduce((a, b) => a + b, 0)
}

function flipSmudge(x, y, l, p) {
    var lines = p.split('\r\n');
    var changedLine = lines[y].split('');
    changedLine[x] = changedLine[x] === '.' ? '#' : '.';
    changedLine = changedLine.join('')
    lines[y] = changedLine
    return lines.join('\r\n');
}

function findMirror(pattern, skipresult) {
    var originalResult = horizontalMirror(pattern, skipresult)
    if (originalResult === null) {
        originalResult = verticalMirror(pattern, skipresult);
    }
    return originalResult;
}

function horizontalMirror(pattern, skipresult) {
    var lines = pattern.split('\r\n')
    for (let i = 0; i < lines.length - 1; i++) {
        let l = i;
        let r = i + 1;
        var good = true
        while (l >= 0 && r <= lines.length - 1 && good) {
            if (lines[l] !== lines[r]) {
                good = false;
            } else {
                l--;
                r++;
            }
        }
        if (good) {
            let result = (i + 1) * 100;
            if (result != skipresult) {
                return result;
            }
        }
    }
    return null;
}

function verticalMirror(pattern, skipresult) {
    var lines = pattern.split('\r\n')
    lines = lines.map(l => l.split(''));
    var verticalLines = [];
    for (let j = 0; j < lines[0].length; j++) {
        verticalLines.push(lines.map(l => l[j]).join(''))
    }
    lines = verticalLines;
    for (let i = 0; i < lines.length - 1; i++) {
        let l = i;
        let r = i + 1;
        var good = true
        while (l >= 0 && r <= lines.length - 1 && good) {
            if (lines[l] !== lines[r]) {
                good = false;
            } else {
                l--;
                r++;
            }
        }
        if (good) {
            var result = (i + 1);
            if (result != skipresult) {
                return result;
            }
        }
    }
    return null;
}
