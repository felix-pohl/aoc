var tests = require("./test")
var fs = require("fs")
var path = require("path")

tests.test.test(() => {
    tests.testWithInput(run1, [], run2, [], 6440, 248105065, 5905, 249515436)
})

function run1(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n')
    var cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();
    var things = {};
    cards.forEach(a => things[a] = []);
    var some = lines.map(l => l.split(' ')).map(arr => { arr.push(arr[0].split('').map(s => cards.indexOf(s))); return arr; })
        .map(a => {
            a.push(a[0].split('').reduce((a, b) => { a[b] = [...a[b], b]; return a }, JSON.parse(JSON.stringify(things))));
            return a;
        })
    return some.map(a => {
        a.push(+Object.values(a[3]).map(v => v.length).sort().reverse().join(''));
        return a;
    }).sort((a, b) => {
        var diff = a[4] - b[4];
        if (diff == 0) {
            for (var i = 0; i < a[2].length; i++) {
                if (a[2][i] - b[2][i] != 0) {
                    return a[2][i] - b[2][i]
                }
            }
            return 0;
        } else {
            return diff
        }
    }).reduce((a, b, i) => a + (b[1] * (i + 1)), 0)
}

function run2(file) {
    var txt = fs.readFileSync(path.dirname(__filename) + "/" + file, "utf8")
    var lines = txt.split('\r\n')
    var cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse();
    var things = {};
    cards.forEach(a => things[a] = []);
    var some = lines.map(l => l.split(' ')).map(arr => { arr.push(arr[0].split('').map(s => cards.indexOf(s))); return arr; })
        .map(a => {
            var chars = a[0].split('');
            var aggr = JSON.parse(JSON.stringify(things));
            chars.forEach(a => aggr[a] = [...aggr[a], a])
            a.push(aggr);
            return a; 
        })
    return some.map(a => {
        var cardCounts = Object.values(a[3]).map(v => v.length);
        var js = cardCounts[8]
        cardCounts[8] = 0;
        var sortnum = +cardCounts.sort().reverse().join('')
        sortnum += js * 1000000000000
        a.push(sortnum);
        return a;
    }).sort((a, b) => {
        var diff = a[4] - b[4];
        if (diff == 0) {
            for (var i = 0; i < a[2].length; i++) {
                if (a[2][i] - b[2][i] != 0) {
                    return a[2][i] - b[2][i]
                }
            }
            return 0;
        } else {
            return diff
        }
    }).reduce((a, b, i) => a + (b[1] * (i + 1)), 0)
}
 