/// <reference types="node" />
/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import { Serializer } from "../../di/Serializer";
import { ILogger } from "../../models/spt/utils/ILogger";
import { HttpRouter } from "../../routers/HttpRouter";
import { LocalisationService } from "../../services/LocalisationService";
import { HttpResponseUtil } from "../../utils/HttpResponseUtil";
import { JsonUtil } from "../../utils/JsonUtil";
import { HttpBufferHandler } from "./HttpBufferHandler";
import { IHttpListener } from "./IHttpListener";
export declare class AkiHttpListener implements IHttpListener {
    protected httpRouter: HttpRouter;
    protected serializers: Serializer[];
    protected logger: ILogger;
    protected requestsLogger: ILogger;
    protected jsonUtil: JsonUtil;
    protected httpResponse: HttpResponseUtil;
    protected localisationService: LocalisationService;
    protected httpBufferHandler: HttpBufferHandler;
    constructor(httpRouter: HttpRouter, // TODO: delay required
    serializers: Serializer[], logger: ILogger, requestsLogger: ILogger, jsonUtil: JsonUtil, httpResponse: HttpResponseUtil, localisationService: LocalisationService, httpBufferHandler: HttpBufferHandler);
    canHandle(_: string, req: IncomingMessage): boolean;
    handle(sessionId: string, req: IncomingMessage, resp: ServerResponse): void;
    sendResponse(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: Buffer, output: string): void;
    getResponse(sessionID: string, req: IncomingMessage, body: Buffer): string;
    protected getBodyInfo(body: Buffer): any;
    sendJson(resp: ServerResponse, output: string, sessionID: string): void;
    sendZlibJson(resp: ServerResponse, output: string, sessionID: string): void;
}
