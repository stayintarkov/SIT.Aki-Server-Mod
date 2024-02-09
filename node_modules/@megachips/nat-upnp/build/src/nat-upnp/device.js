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
exports.Device = void 0;
const axios_1 = __importDefault(require("axios"));
const url_1 = require("url");
const fast_xml_parser_1 = require("fast-xml-parser");
class Device {
    constructor(url) {
        this.description = url;
        this.services = [
            "urn:schemas-upnp-org:service:WANIPConnection:1",
            "urn:schemas-upnp-org:service:WANIPConnection:2",
            "urn:schemas-upnp-org:service:WANPPPConnection:1",
        ];
    }
    getXML(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default
                .get(url)
                .then(({ data }) => new fast_xml_parser_1.XMLParser().parse(data))
                .catch(() => { throw new Error("Router error. Failed to lookup device description"); });
        });
    }
    getService(types) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getXML(this.description).then(({ root: xml }) => {
                const services = this.parseDescription(xml).services.filter(({ serviceType }) => types.includes(serviceType));
                if (services.length === 0 ||
                    !services[0].controlURL ||
                    !services[0].SCPDURL) {
                    throw new Error("Service not found");
                }
                const baseUrl = new url_1.URL(xml.baseURL, this.description);
                const prefix = (url) => new url_1.URL(url, baseUrl.toString()).toString();
                return {
                    service: services[0].serviceType,
                    SCPDURL: prefix(services[0].SCPDURL),
                    controlURL: prefix(services[0].controlURL),
                };
            });
        });
    }
    run(action, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.getService(this.services);
            const body = '<?xml version="1.0"?>' +
                "<s:Envelope " +
                'xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" ' +
                's:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
                "<s:Body>" +
                "<u:" +
                action +
                " xmlns:u=" +
                JSON.stringify(info.service) +
                ">" +
                args.reduce((p, [a, b]) => p + `<${a !== null && a !== void 0 ? a : ""}>${b !== null && b !== void 0 ? b : ""}</${a !== null && a !== void 0 ? a : ""}>`, "") +
                "</u:" +
                action +
                ">" +
                "</s:Body>" +
                "</s:Envelope>";
            return axios_1.default
                .post(info.controlURL, body, {
                headers: {
                    "Content-Type": 'text/xml; charset="utf-8"',
                    "Content-Length": "" + Buffer.byteLength(body),
                    Connection: "close",
                    SOAPAction: JSON.stringify(info.service + "#" + action),
                },
            })
                .then(({ data }) => new fast_xml_parser_1.XMLParser({ removeNSPrefix: true }).parse(data).Envelope.Body);
        });
    }
    parseDescription(info) {
        const services = [];
        const devices = [];
        function traverseDevices(device) {
            var _a, _b, _c, _d;
            if (!device)
                return;
            const serviceList = (_b = (_a = device.serviceList) === null || _a === void 0 ? void 0 : _a.service) !== null && _b !== void 0 ? _b : [];
            const deviceList = (_d = (_c = device.deviceList) === null || _c === void 0 ? void 0 : _c.device) !== null && _d !== void 0 ? _d : [];
            devices.push(device);
            if (Array.isArray(serviceList)) {
                services.push(...serviceList);
            }
            else {
                services.push(serviceList);
            }
            if (Array.isArray(deviceList)) {
                deviceList.forEach(traverseDevices);
            }
            else {
                traverseDevices(deviceList);
            }
        }
        traverseDevices(info.device);
        return {
            services,
            devices,
        };
    }
}
exports.Device = Device;
exports.default = Device;
