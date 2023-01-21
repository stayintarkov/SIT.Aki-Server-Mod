import { IHttpConfig } from "../models/spt/config/IHttpConfig";
import { ConfigServer } from "../servers/ConfigServer";
export declare class HttpServerHelper {
    protected configServer: ConfigServer;
    protected httpConfig: IHttpConfig;
    protected mime: {
        css: string;
        bin: string;
        html: string;
        jpg: string;
        js: string;
        json: string;
        png: string;
        svg: string;
        txt: string;
    };
    constructor(configServer: ConfigServer);
    getMimeText(key: string): string;
    buildUrl(): string;
    getBackendUrl(): string;
    getWebsocketUrl(): string;
    sendTextJson(resp: any, output: any): void;
}
