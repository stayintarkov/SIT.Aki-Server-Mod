"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_helpers_1 = require("../reflection-helpers");
function inject(token) {
    return reflection_helpers_1.defineInjectionTokenMetadata(token);
}
exports.default = inject;
