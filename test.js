"use strict"
const fs = require('fs');
const vm = require("vm");
const path = require("path")

var tests = []

var testObj = {
    test: (cb) => {
        tests.push(cb);
    },
    ex: () => {
        tests.forEach(t => {
            try {
                t()
            } catch (e) {
                console.log(e)
            }

        })
    },
}

function withFile(name, fn, args, expected) {
    const ex1_actual = fn.apply(null, args)
    var result1_example = ex1_actual == expected;
    if (!result1_example) {
        throw new Error('\x1b[31m❌\x1b[0m ' + name + ' was not correct got \x1b[31m' + ex1_actual + '\x1b[0m expected \x1b[32m' + expected + '\x1b[0m')
    } else {
        console.log('\x1b[32m✔\x1b[0m ' + name + ' success')
    }
}

function testWithInput(fn1, fn1Args, fn2, fn2Args, filename, ...args) {
    var [ex1_expected, in1_expected, ex2_expected, in2_expected] = args;
    withFile('example 1', fn1, ['example.txt', ...fn1Args], ex1_expected)
    withFile('input 1', fn1, ['input.txt', ...fn1Args], in1_expected)
    var ex2_file = 'example.txt';
    if (fs.existsSync(path.dirname(filename) + "/" + 'example2.txt', "utf8")) {
        ex2_file = 'example2.txt';
    }
    withFile('example 2', fn2, [ex2_file, ...fn2Args], ex2_expected)
    withFile('input 2', fn2, ['input.txt', ...fn2Args], in2_expected)
}

this.require = require;

function run(filename, self) {
    if (filename.endsWith('.js') && filename != 'test.js') {
        tests = [];
        Array.from({ length: 10 }).forEach(s => console.log())
        console.log(new Date(), 'run tests for', filename)
        try {
            var pathname = '.\\' + filename;
            var data = fs.readFileSync(pathname);
            function require(pathname) {
                return self.require(pathname);
            }
            var sandBox = vm.createContext({ require, console, __filename: __dirname + '\\' + filename, testRef: testObj });
            var runString = ';testRef.ex();'
            vm.runInContext(data + runString, sandBox, {
                filename: pathname,
                timeout: 100000
            });
        } catch (e) {
            console.log(e)
        }
    }
}

var timeout;
var watchDir = ".";
fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
    if (timeout) {
        clearTimeout(timeout)
    }
    timeout = setTimeout(run, 1000, filename, this)
});

console.log('👀 watching js files in ' + __dirname)

exports.test = testObj;
exports.testWithInput = testWithInput;