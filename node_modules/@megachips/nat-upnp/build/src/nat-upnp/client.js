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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const device_1 = __importDefault(require("./device"));
const ssdp_1 = __importDefault(require("./ssdp"));
class Client {
    constructor(options = {}) {
        this.ssdp = new ssdp_1.default();
        this.upnpInfo = null;
        if (options.url && !(options.localAddress)) {
            throw new Error("`localAddress` must be supplied if using `url`");
        }
        this.timeout = options.timeout || 1800;
        this.url = options.url || null;
        this.localAddress = options.localAddress || null;
        this.cacheGateway = options.cacheGateway || false;
    }
    createMapping(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getGateway().then(({ gateway, localAddress }) => {
                var _a;
                const ports = normalizeOptions(options);
                if (typeof ports.remote.host === 'undefined')
                    ports.remote.host = "";
                return gateway.run("AddPortMapping", [
                    ["NewRemoteHost", ports.remote.host + ""],
                    ["NewExternalPort", ports.remote.port + ""],
                    [
                        "NewProtocol",
                        options.protocol ? options.protocol.toUpperCase() : "TCP",
                    ],
                    ["NewInternalPort", ports.internal.port + ""],
                    ["NewInternalClient", ports.internal.host || localAddress],
                    ["NewEnabled", 1],
                    ["NewPortMappingDescription", options.description || "node:nat:upnp"],
                    ["NewLeaseDuration", (_a = options.ttl) !== null && _a !== void 0 ? _a : 60 * 30],
                ]);
            });
        });
    }
    removeMapping(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getGateway().then(({ gateway }) => {
                const ports = normalizeOptions(options);
                if (typeof ports.remote.host === 'undefined')
                    ports.remote.host = "";
                return gateway.run("DeletePortMapping", [
                    ["NewRemoteHost", ports.remote.host + ""],
                    ["NewExternalPort", ports.remote.port + ""],
                    [
                        "NewProtocol",
                        options.protocol ? options.protocol.toUpperCase() : "TCP",
                    ],
                ]);
            });
        });
    }
    getMappings(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gateway, localAddress } = yield this.getGateway();
            let i = 0;
            let end = false;
            const results = [];
            while (true) {
                const data = (yield gateway
                    .run("GetGenericPortMappingEntry", [["NewPortMappingIndex", i++]])
                    .catch((err) => {
                    var _a;
                    if (i !== 1 || /ArrayIndexInvalid/.test((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data)) {
                        end = true;
                    }
                }));
                if (end)
                    break;
                const key = Object.keys(data || {}).find((k) => /^GetGenericPortMappingEntryResponse/.test(k));
                if (!key) {
                    throw new Error("Incorrect response");
                }
                const res = data[key];
                const result = {
                    public: {
                        host: (typeof res.NewRemoteHost === "string" && res.NewRemoteHost) || "",
                        port: parseInt(res.NewExternalPort, 10),
                    },
                    private: {
                        host: res.NewInternalClient,
                        port: parseInt(res.NewInternalPort, 10),
                    },
                    protocol: res.NewProtocol.toLowerCase(),
                    enabled: res.NewEnabled === "1",
                    description: res.NewPortMappingDescription,
                    ttl: parseInt(res.NewLeaseDuration, 10),
                    // temporary, so typescript will compile
                    local: false,
                };
                result.local = result.private.host === localAddress;
                if (options.local && !result.local) {
                    continue;
                }
                if (options.description) {
                    if (typeof result.description !== "string")
                        continue;
                    if (options.description instanceof RegExp) {
                        if (!options.description.test(result.description))
                            continue;
                    }
                    else {
                        if (result.description.indexOf(options.description) === -1)
                            continue;
                    }
                }
                results.push(result);
            }
            return results;
        });
    }
    getPublicIp() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getGateway().then(({ gateway, localAddress }) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const data = yield gateway.run("GetExternalIPAddress", []);
                const key = Object.keys(data || {}).find((k) => /^GetExternalIPAddressResponse$/.test(k));
                if (!key)
                    throw new Error("Incorrect response");
                return ((_a = data[key]) === null || _a === void 0 ? void 0 : _a.NewExternalIPAddress) + "";
            }));
        });
    }
    getGateway() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.url) {
                if (!this.upnpInfo) {
                    this.upnpInfo = { gateway: new device_1.default(this.url), localAddress: this.localAddress };
                }
                // resolve immediately without running SSDP.
                return Promise.resolve(this.upnpInfo);
            }
            let timeouted = false;
            const p = this.ssdp.search("urn:schemas-upnp-org:device:InternetGatewayDevice:1");
            return new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    timeouted = true;
                    p.emit("end");
                    // this will only happen after at least one call. (If cacheGateway is set below)
                    if (this.upnpInfo) {
                        resolve(this.upnpInfo);
                    }
                    reject(new Error("Connection timed out while searching for the gateway."));
                }, this.timeout);
                p.on("device", (info, localAddress) => {
                    if (timeouted)
                        return;
                    p.emit("end");
                    clearTimeout(timeout);
                    const upnpInfo = { gateway: new device_1.default(info.location), localAddress };
                    if (this.cacheGateway) {
                        this.upnpInfo = upnpInfo;
                    }
                    resolve(upnpInfo);
                });
            });
        });
    }
    close() {
        this.ssdp.close();
    }
}
exports.Client = Client;
function normalizeOptions(options) {
    function toObject(addr) {
        if (typeof addr === "number")
            return { port: addr };
        if (typeof addr === "string" && !isNaN(addr))
            return { port: Number(addr) };
        if (typeof addr === "object")
            return addr;
        return {};
    }
    return {
        remote: toObject(options.public),
        internal: toObject(options.private),
    };
}
exports.default = Client;
