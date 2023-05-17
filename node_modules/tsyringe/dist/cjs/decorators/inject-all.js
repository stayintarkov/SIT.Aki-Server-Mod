"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_helpers_1 = require("../reflection-helpers");
function injectAll(token) {
    const data = { token, multiple: true };
    return reflection_helpers_1.defineInjectionTokenMetadata(data);
}
exports.default = injectAll;
