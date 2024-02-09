"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNamespace = void 0;
function getNamespace(data, uri) {
    var _a;
    const keys = Object.keys((_a = data["@"]) !== null && _a !== void 0 ? _a : {});
    for (let x = 0; x < keys.length; x++) {
        const key = keys[x];
        if (!/^xmlns:/.test(key) || data["@"][key] !== uri) {
            continue;
        }
        return key.replace(/^xmlns:/, "") + ":";
    }
    return "";
}
exports.getNamespace = getNamespace;
exports.default = { getNamespace };
