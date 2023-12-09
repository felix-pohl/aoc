const { Console } = require("console")
var tests = require("./test")
var fs = require("fs")
var path = require("path")

tests.test.test(() => {
    tests.testWithInput(run1, [], run2, [], __filename, 114, 1708206096, 2, 1050)
})

function run1(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n')
    return lines.map(l => l.split(' ').map(s => +s)).map(l => {
        var lists = [];
        lists.push(l)
        var listToDiff = l;
        while (listToDiff.some(e => e !== 0)) {
            var difflist = [];
            for (let i = 0; i < listToDiff.length - 1; i++) {
                difflist.push(listToDiff[i + 1] - listToDiff[i]);
            }
            lists.push([...difflist]);
            listToDiff = [...difflist];
        }
        let acc = 0;
        for (let k = lists.length - 1; k >= 0; k--) {
            acc += lists[k].at(-1)
        }
        return acc;
    }).reduce((a, b) => a + b, 0)
}

function run2(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n')
    return lines.map(l => l.split(' ').map(s => +s)).map(l => {
        var lists = [];
        lists.push(l)
        var listToDiff = l;
        while (listToDiff.some(e => e !== 0)) {
            var difflist = [];
            for (let i = 0; i < listToDiff.length - 1; i++) {
                difflist.push(listToDiff[i + 1] - listToDiff[i]);
            }
            lists.push([...difflist]);
            listToDiff = [...difflist];
        }
        let acc = 0;
        for (let k = lists.length - 1; k >= 0; k--) {
            acc = lists[k].at(0) - acc
        }
        return acc;
    }).reduce((a, b) => a + b, 0)
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
