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
require("./api.test");
function setupTest(testName, callback) {
    const testOptions = new TestOptions();
    callback(testOptions);
    console.log(testName);
    testOptions.startTests();
}
exports.setupTest = setupTest;
class TestOptions {
    constructor() {
        this.testCount = 5;
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
                console.log(testName);
                for (let y = 0; y < testCount; y++) {
                    runBefore();
                    results.push(yield run());
                    runAfter();
                }
                if (!results.some((el) => !el)) {
                    // success
                    console.log("success");
                }
                else {
                    // failed
                    console.log("failed");
                }
            }
        });
    }
    get isTestRunning() {
        return this.isRunning;
    }
}
exports.TestOptions = TestOptions;
