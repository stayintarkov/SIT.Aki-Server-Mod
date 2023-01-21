/// <reference types="node" />
import http, { IncomingMessage, ServerResponse } from "http";
import { ApplicationContext } from "../context/ApplicationContext";
import { HttpServerHelper } from "../helpers/HttpServerHelper";
import { IHttpConfig } from "../models/spt/config/IHttpConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { LocalisationService } from "../services/LocalisationService";
import { ConfigServer } from "./ConfigServer";
import { DatabaseServer } from "./DatabaseServer";
import { IHttpListener } from "./http/IHttpListener";
import { WebSocketServer } from "./WebSocketServer";
export declare class HttpServer {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected httpServerHelper: HttpServerHelper;
    protected localisationService: LocalisationService;
    protected httpListeners: IHttpListener[];
    protected configServer: ConfigServer;
    protected applicationContext: ApplicationContext;
    protected webSocketServer: WebSocketServer;
    constructor(logger: ILogger, databaseServer: DatabaseServer, httpServerHelper: HttpServerHelper, localisationService: LocalisationService, httpListeners: IHttpListener[], configServer: ConfigServer, applicationContext: ApplicationContext, webSocketServer: WebSocketServer);
    protected httpConfig: IHttpConfig;
    getCookies(req: http.IncomingMessage): any;
    handleRequest(req: IncomingMessage, resp: ServerResponse): void;
    load(): void;
}
