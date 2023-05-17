"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_helpers_1 = require("../reflection-helpers");
const dependency_container_1 = require("../dependency-container");
function injectable() {
    return function (target) {
        dependency_container_1.typeInfo.set(target, reflection_helpers_1.getParamInfo(target));
    };
}
exports.default = injectable;
