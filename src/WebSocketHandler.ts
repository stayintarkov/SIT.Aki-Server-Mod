import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IncomingMessage } from "http";
import WebSocket, { RawData } from "ws";
import { CoopMatch, CoopMatchEndSessionMessages } from "./CoopMatch";

type WebSocketClientState = {
    sessionID: NonNullable<string>;
    websocket: NonNullable<WebSocket.WebSocket>;
    currentMatch: CoopMatch;
}

export class WebSocketHandler {
    public webSockets: Record<string, WebSocketClientState> = {};
    logger: ILogger;
    public static Instance: WebSocketHandler;

    constructor(port: number, logger: ILogger) {
        WebSocketHandler.Instance = this;
        this.logger = logger;
        const webSocketServer = new WebSocket.Server({
            port,
            clientTracking: true,
            skipUTF8Validation: true
        });

        webSocketServer.addListener("listening", () => {
            this.logger.info(`SIT: TCP Relay WebSocket is listening on ${port}`);
        });

        webSocketServer.addListener("connection", this.wsOnConnection.bind(this));
    }

    protected wsOnConnection(ws: WebSocket.WebSocket, req: IncomingMessage): void 
    {
        const splitUrl = req.url.substring(0, req.url.indexOf("?")).split("/");
        const sessionID = splitUrl.pop();
        const state = this.webSockets[sessionID] = {sessionID, websocket: ws, currentMatch: null};
        
        ws.on("message", (msg) => this.processMessage(state, msg));

        ws.on("close", (code: number, reason: Buffer) => this.processClose(state, sessionID));
        
        this.logger.info(`${sessionID}:${req.socket.remoteAddress} has connected to SIT WebSocket`);
    }

    private processMessage(state: WebSocketClientState, msg: RawData): void {
        // if not JSON array or object, and not SIT*, fan out binary payload as a black box
        if (msg[0] !== 0x5B && msg[0] !== 0x7B && !(msg[0] === 0x53 && msg[1] === 0x49 && msg[2] === 0x54)) {
            if (state.currentMatch) {
                WebSocketHandler.Instance.sendToWebSockets(state.currentMatch.ConnectedUsers, msg, undefined);
            } else {
                this.logger.warning(`${state.sessionID}: received raw binary without a corresponding match`);
            }
        } else {
            this.processMessageString(state, msg, msg.toString());
        }
    }

    private processClose(state: WebSocketClientState, sessionId: string): void {
        this.logger.info(`Web Socket ${sessionId} has disconnected`);

        if (this.webSockets[sessionId] !== undefined)
            delete this.webSockets[sessionId];
    }

    private processMessageString(state: WebSocketClientState, msg: RawData, msgStr: string): void {
        // If is SIT serialized string -- This is NEVER stored.
        if (msgStr.startsWith("SIT")) {
            const messageWithoutSITPrefix = msgStr.substring(3, msgStr.length);
            // const serverId = messageWithoutSITPrefix.substring(0, 24); // get serverId (MongoIds are 24 characters)
            
            // Post 0.13.5.0.*
            // const serverId = messageWithoutSITPrefix.substring(0, 27); // get serverId post 0.13.5.0.* these are 27 (pmc{Id})

            // Post 0.14.*, yes thats right, we are back to 24 chars again
            const serverId = messageWithoutSITPrefix.substring(0, 24); // get serverId (MongoIds are 24 characters)

            // the last chunk will be the method, the ?, and other data
            const messageWithoutSITPrefixes = messageWithoutSITPrefix.substring(24, messageWithoutSITPrefix.length); 

            const match = CoopMatch.CoopMatches[serverId];
            if (match) {
                // match.ProcessData(messageWithoutSITPrefixes, this.logger);
                const method = messageWithoutSITPrefixes.substring(1, messageWithoutSITPrefixes.indexOf('?'));
                let d = messageWithoutSITPrefixes.substring(messageWithoutSITPrefixes.indexOf('?')).replace('?', '')
                d = d.replace(method, ""); // remove method
                // d = d.substring(1); // remove method length prefix
                // const resultObj = { m: method, data: d, message: msgStr };
                // WebSocketHandler.Instance.sendToWebSockets(match.ConnectedUsers, JSON.stringify(resultObj));
                WebSocketHandler.Instance.sendToWebSockets(match.ConnectedUsers, msg, undefined);
            } else {
                this.logger.warning(`couldn't find match ${serverId}`);
            }
            return;
        } else if (msgStr[0] === "[") {
            const ary = JSON.parse(msgStr);
            for (const key in ary) {
                this.processObject(state, ary[key]);
            }
        } else if (msgStr[0] === "{") {
            this.processObject(state, JSON.parse(msgStr));
        } else {
            this.logger.error(`unexpected message: ${msgStr.substring(0, 100)}`);
        }
    }

    private processObject(state: WebSocketClientState, jsonObject: any): void {
        const {profileId, serverId, connect} = jsonObject;
        const match = CoopMatch.CoopMatches[serverId];
        if (match) {
            if (connect) {
                if (!match.PlayerJoined(profileId)) {
                    const ws = state.websocket;
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ "endSession": true, reason: CoopMatchEndSessionMessages.WEBSOCKET_TIMEOUT_MESSAGE }));
                        ws.close();
                    }
                    delete this.webSockets[profileId];
                }
                state.currentMatch = match;
            } else {
                if (match !== state.currentMatch) {
                    this.logger.warning(`match mismatch between client state (${state.currentMatch?.ServerId}) and client request (${match.ServerId})`)
                }
                match.ProcessData(jsonObject, this.logger);
            }
        } else {
            this.sendToAllWebSockets(undefined, JSON.stringify(jsonObject));
        }
    }

    public sendToAllWebSockets(data: RawData, dataString: string): void {
        this.sendToWebSockets(Object.keys(this.webSockets), data, dataString);
    }

    public sendToWebSockets(sessions: string[], data: RawData, dataString: string): void {
        for (const session of sessions) {
            if (this.webSockets[session]) {
                const ws = this.webSockets[session].websocket;
                if (ws.readyState === WebSocket.OPEN) {
                    if (data !== undefined)
                        ws.send(data);

                    if (dataString !== undefined)
                        ws.send(dataString);
                } else {
                    delete this.webSockets[session];
                }
            }
        }
    }
}
