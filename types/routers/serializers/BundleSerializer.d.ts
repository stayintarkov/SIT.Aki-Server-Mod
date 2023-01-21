/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import { Serializer } from "../../di/Serializer";
import { BundleLoader } from "../../loaders/BundleLoader";
import { ILogger } from "../../models/spt/utils/ILogger";
import { HttpFileUtil } from "../../utils/HttpFileUtil";
export declare class BundleSerializer extends Serializer {
    protected logger: ILogger;
    protected bundleLoader: BundleLoader;
    protected httpFileUtil: HttpFileUtil;
    constructor(logger: ILogger, bundleLoader: BundleLoader, httpFileUtil: HttpFileUtil);
    serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): void;
    canHandle(route: string): boolean;
}
