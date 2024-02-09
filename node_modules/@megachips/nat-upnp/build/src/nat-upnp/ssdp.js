"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ssdp = void 0;
const dgram_1 = __importDefault(require("dgram"));
const os_1 = __importDefault(require("os"));
const events_1 = __importDefault(require("events"));
class Ssdp {
    constructor(options) {
        var _a;
        this.options = options;
        this.sourcePort = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.sourcePort) || 0;
        this.bound = false;
        this.boundCount = 0;
        this.closed = false;
        this.queue = [];
        this.multicast = "239.255.255.250";
        this.port = 1900;
        this.ssdpEmitter = new events_1.default();
        // Create sockets on all external interfaces
        const interfaces = os_1.default.networkInterfaces();
        this.sockets = Object.keys(interfaces).reduce((arr, key) => {
            var _a, _b;
            return arr.concat((_b = (_a = interfaces[key]) === null || _a === void 0 ? void 0 : _a.filter((item) => !item.internal).map((item) => this.createSocket(item))) !== null && _b !== void 0 ? _b : []);
        }, []);
    }
    createSocket(iface) {
        const socket = dgram_1.default.createSocket(iface.family === "IPv4" ? "udp4" : "udp6");
        socket.on("message", (message) => {
            // Ignore messages after closing sockets
            if (this.closed)
                return;
            // Parse response
            this.parseResponse(message.toString(), socket.address);
        });
        // Bind in next tick (sockets should be me in this.sockets array)
        process.nextTick(() => {
            // Unqueue this._queue once all sockets are ready
            const onready = () => {
                if (this.boundCount < this.sockets.length)
                    return;
                this.bound = true;
                this.queue.forEach(([device, emitter]) => this.search(device, emitter));
            };
            socket.on("listening", () => {
                this.boundCount += 1;
                onready();
            });
            // On error - remove socket from list and execute items from queue
            socket.once("error", () => {
                socket.close();
                this.sockets.splice(this.sockets.indexOf(socket), 1);
                onready();
            });
            socket.address = iface.address;
            socket.bind(this.sourcePort, iface.address);
        });
        return socket;
    }
    parseResponse(response, addr) {
        // Ignore incorrect packets
        if (!/^(HTTP|NOTIFY)/m.test(response))
            return;
        const headers = parseMimeHeader(response);
        // We are only interested in messages that can be matched against the original
        // search target
        if (!headers.st)
            return;
        this.ssdpEmitter.emit("device", headers, addr);
    }
    search(device, emitter) {
        if (!emitter) {
            emitter = new events_1.default();
            emitter._ended = false;
            emitter.once("end", () => {
                emitter._ended = true;
            });
        }
        if (!this.bound) {
            this.queue.push([device, emitter]);
            return emitter;
        }
        const query = Buffer.from("M-SEARCH * HTTP/1.1\r\n" +
            "HOST: " +
            this.multicast +
            ":" +
            this.port +
            "\r\n" +
            'MAN: "ssdp:discover"\r\n' +
            "MX: 1\r\n" +
            "ST: " +
            device +
            "\r\n" +
            "\r\n");
        // Send query on each socket
        this.sockets.forEach((socket) => socket.send(query, 0, query.length, this.port, this.multicast));
        const ondevice = (headers, address) => {
            if (!emitter || emitter._ended || headers.st !== device)
                return;
            emitter.emit("device", headers, address);
        };
        this.ssdpEmitter.on("device", ondevice);
        // Detach listener after receiving 'end' event
        emitter.once("end", () => this.ssdpEmitter.removeListener("device", ondevice));
        return emitter;
    }
    close() {
        // idempotent
        if (!this.closed) {
            try {
                this.sockets.forEach((socket) => socket.close());
            }
            catch (_a) {
                // pass
            }
            this.sockets.length = 0;
            this.closed = true;
            this.bound = false;
            this.boundCount = 0;
        }
    }
}
exports.Ssdp = Ssdp;
function parseMimeHeader(headerStr) {
    const lines = headerStr.split(/\r\n/g);
    // Parse headers from lines to hashmap
    return lines.reduce((headers, line) => {
        var _a;
        const [_, key, value] = (_a = line.match(/^([^:]*)\s*:\s*(.*)$/)) !== null && _a !== void 0 ? _a : [];
        if (key && value) {
            headers[key.toLowerCase()] = value;
        }
        return headers;
    }, {});
}
exports.default = Ssdp;
