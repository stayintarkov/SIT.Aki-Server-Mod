/// <reference types="node" />
import http, { IncomingMessage } from "http";
import WebSocket from "ws";
import { HttpServerHelper } from "../helpers/HttpServerHelper";
import { INotification } from "../models/eft/notifier/INotifier";
import { IHttpConfig } from "../models/spt/config/IHttpConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { LocalisationService } from "../services/LocalisationService";
import { RandomUtil } from "../utils/RandomUtil";
import { ConfigServer } from "./ConfigServer";
export declare class WebSocketServer {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected configServer: ConfigServer;
    protected localisationService: LocalisationService;
    protected httpServerHelper: HttpServerHelper;
    constructor(logger: ILogger, randomUtil: RandomUtil, configServer: ConfigServer, localisationService: LocalisationService, httpServerHelper: HttpServerHelper);
    protected httpConfig: IHttpConfig;
    protected defaultNotification: INotification;
    protected webSockets: Record<string, WebSocket.WebSocket>;
    protected websocketPingHandler: any;
    setupWebSocket(httpServer: http.Server): void;
    sendMessage(sessionID: string, output: INotification): void;
    protected getRandomisedMessage(): string;
    isConnectionWebSocket(sessionID: string): boolean;
    protected wsOnConnection(ws: WebSocket.WebSocket, req: IncomingMessage): void;
}
