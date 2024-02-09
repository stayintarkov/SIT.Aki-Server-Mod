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
const net_1 = __importDefault(require("net"));
const index_test_1 = require("./index.test");
const src_1 = require("../src");
(0, index_test_1.setupTest)("NAT-UPNP/Client", (opts) => {
    let client;
    opts.runBefore(() => {
        client = new src_1.Client();
    });
    opts.runAfter(() => {
        client.close();
    });
    opts.run("Port mapping/unmapping", () => __awaiter(void 0, void 0, void 0, function* () {
        // Random port between 2000 and 65536 to avoid blockages
        const publicPort = ~~(Math.random() * 63536 + 2000);
        yield client.createMapping({
            public: publicPort,
            private: ~~(Math.random() * 65536),
            ttl: 0,
        });
        yield client.removeMapping({ public: publicPort });
        return true;
    }));
    opts.run("Find port after mapping", () => __awaiter(void 0, void 0, void 0, function* () {
        // Random port between 2000 and 65536 to avoid blockages
        const publicPort = ~~(Math.random() * 63536 + 2000);
        yield client.createMapping({
            public: publicPort,
            private: ~~(Math.random() * 65536),
            description: "node:nat:upnp:search-test",
            ttl: 20,
        });
        const mappings = yield client.getMappings({
            local: true,
            description: /search-test/,
        });
        if (!mappings.some((mapping) => mapping.public.port === publicPort)) {
            return false;
        }
        yield client.removeMapping({ public: { port: publicPort } });
        return true;
    }));
    opts.run("Get public ip address", () => __awaiter(void 0, void 0, void 0, function* () {
        const ip = yield client.getPublicIp();
        return net_1.default.isIP(ip) !== 0;
    }));
});
