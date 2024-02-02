"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestOptions = exports.setupTest = void 0;
const queue = [];
let running = false;
function header(s) {
    console.log("\n==========", s, "==========");
}
function footer(n) {
    const arr = [];
    arr.length = n;
    console.log("\n===========" + arr.fill("=").join("") + "===========\n");
}
function runNextInQueue(prev) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        footer(prev.length);
        const [name, opts] = (_a = queue.shift()) !== null && _a !== void 0 ? _a : [];
        if (!name || !opts)
            process.exit();
        header(name);
        opts.startTests().then(() => runNextInQueue(name));
    });
}
function setupTest(testName, callback) {
    const testOptions = new TestOptions();
    callback(testOptions);
    if (running) {
        queue.push([testName, testOptions]);
        return;
    }
    running = true;
    header(testName);
    testOptions.startTests().then(() => runNextInQueue(testName));
}
exports.setupTest = setupTest;
class TestOptions {
    constructor() {
        this.testCount = 1;
        this.tests = [];
        this.isRunning = false;
        this.runBeforeCallback = null;
        this.runAfterCallback = null;
    }
    runBefore(callback) {
        this.runBeforeCallback = callback;
    }
    runAfter(callback) {
        this.runAfterCallback = callback;
    }
    run(desc, callback) {
        this.tests.push([desc, callback]);
    }
    startTests() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRunning)
                return;
            this.isRunning = true;
            const testCount = this.testCount;
            const tests = [...this.tests];
            const runBefore = (_a = this.runBeforeCallback) !== null && _a !== void 0 ? _a : (() => null);
            const runAfter = (_b = this.runAfterCallback) !== null && _b !== void 0 ? _b : (() => null);
            for (let x = 0; x < tests.length; x++) {
                const [testName, run] = tests[x];
                const results = [];
                const errors = [];
                console.log("\n" + testName);
                for (let y = 0; y < testCount; y++) {
                    runBefore();
                    results.push(yield run()
                        .then((s) => {
                        if (s) {
                            console.log("Test #" + y + ":", "\x1b[32msuccess\x1b[0m");
                        }
                        else {
                            console.log("Test #" + y + ":", "\x1b[31mfailed\x1b[0m");
                        }
                        return s;
                    })
                        .catch((err) => {
                        console.log("Test #" + y + ":", "\x1b[31mfailed\x1b[0m");
                        errors.push(err);
                        return false;
                    }));
                    runAfter();
                }
                if (!results.some((el) => !el)) {
                    // success
                    console.log("Testcase: \x1b[32msuccess\x1b[0m");
                }
                else {
                    // failed
                    errors.forEach((err) => console.error(err));
                    console.log("Testcase: \x1b[31mfailed with", errors.length, "errors\x1b[0m");
                }
            }
        });
    }
    get isTestRunning() {
        return this.isRunning;
    }
}
exports.TestOptions = TestOptions;
console.log("uPnP Test Version 0.8");
require("./ssdp.flux-test");
require("./api.flux-test");
