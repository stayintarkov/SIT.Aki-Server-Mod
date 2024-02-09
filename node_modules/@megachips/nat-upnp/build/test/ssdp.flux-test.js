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
const src_1 = require("../src");
const index_flux_test_1 = require("./index.flux-test");
(0, index_flux_test_1.setupTest)("NAT-UPNP/Ssdp", (opts) => {
    let client;
    opts.runBefore(() => {
        client = new src_1.Ssdp();
    });
    opts.runAfter(() => {
        client.close();
    });
    opts.run("Find router device. *** If this hangs you may need to enable uPnP on your router ***", () => __awaiter(void 0, void 0, void 0, function* () {
        const p = client.search("urn:schemas-upnp-org:device:InternetGatewayDevice:1");
        return new Promise((s) => {
            p.on("device", (device) => {
                p.emit("end");
                s(typeof device.location === "string");
            });
        });
    }));
});
