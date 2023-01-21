import { BundleLoader } from "../loaders/BundleLoader";
import { IHttpConfig } from "../models/spt/config/IHttpConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { HttpFileUtil } from "../utils/HttpFileUtil";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
export declare class BundleCallbacks {
    protected logger: ILogger;
    protected httpResponse: HttpResponseUtil;
    protected httpFileUtil: HttpFileUtil;
    protected bundleLoader: BundleLoader;
    protected configServer: ConfigServer;
    protected httpConfig: IHttpConfig;
    constructor(logger: ILogger, httpResponse: HttpResponseUtil, httpFileUtil: HttpFileUtil, bundleLoader: BundleLoader, configServer: ConfigServer);
    sendBundle(sessionID: string, req: any, resp: any, body: any): any;
    getBundles(url: string, info: any, sessionID: string): string;
    getBundle(url: string, info: any, sessionID: string): string;
}
