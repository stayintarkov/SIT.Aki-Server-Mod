"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Ssdp = exports.Device = void 0;
const device_1 = require("./nat-upnp/device");
const client_1 = require("./nat-upnp/client");
const ssdp_1 = require("./nat-upnp/ssdp");
var natupnp;
(function (natupnp) {
    natupnp.Ssdp = ssdp_1.Ssdp;
    natupnp.Device = device_1.Device;
    natupnp.Client = client_1.Client;
})(natupnp || (natupnp = {}));
var device_2 = require("./nat-upnp/device");
Object.defineProperty(exports, "Device", { enumerable: true, get: function () { return device_2.Device; } });
var ssdp_2 = require("./nat-upnp/ssdp");
Object.defineProperty(exports, "Ssdp", { enumerable: true, get: function () { return ssdp_2.Ssdp; } });
var client_2 = require("./nat-upnp/client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_2.Client; } });
exports.default = natupnp;
