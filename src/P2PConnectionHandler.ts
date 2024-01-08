import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IncomingMessage } from "http";
import WebSocket, { RawData } from "ws";
import { CoopMatch } from "./CoopMatch";

class EndPoints {
    StunIp: string;
    StunPort: number;
    UpnpIp: string;
    UpnpPort: number;
    PortForwardingIp: string;
    PortForwardingPort: number;

    constructor
    (
        stunIp: string,
        stunPort: number,
        upnpIp: string,
        upnpPort: number,
        portForwardingIp: string,
        portForwardingPort: number
    )
    {
        this.StunIp = stunIp;
        this.StunPort = stunPort;
        this.UpnpIp = upnpIp;
        this.UpnpPort = upnpPort;
        this.PortForwardingIp = portForwardingIp;
        this.PortForwardingPort = portForwardingPort;
    }
}

export class P2PConnectionHandler {

    public webSockets: Record<string, WebSocket.WebSocket> = {};
    public serverEndpoints: Record<string, EndPoints> = {};

    logger: ILogger;
    public static Instance: P2PConnectionHandler;

    constructor(
        webSocketPort: number
        , logger: ILogger
        )
        { 
            P2PConnectionHandler.Instance = this;
            this.logger = logger;
            const webSocketServer = new WebSocket.Server({
                port: webSocketPort,
                perMessageDeflate: {
                    // Other options settable:
                    clientNoContextTakeover: true, // Defaults to negotiated value.
                    serverNoContextTakeover: true, // Defaults to negotiated value.
                    serverMaxWindowBits: 10, // Defaults to negotiated value.
                    // Below options specified as default values.
                    concurrencyLimit: 10, // Limits zlib concurrency for perf.
                    threshold: 1024 // Size (in bytes) below which messages
                    // should not be compressed if context takeover is disabled.
                }
            });
    
            webSocketServer.addListener("listening", () => 
            {
                console.log(`P2P Connection Helper started on port ${webSocketPort}!`);
            });
    
            webSocketServer.addListener("connection", this.wsOnConnection.bind(this));
        }

    protected wsOnConnection(ws: WebSocket.WebSocket, req: IncomingMessage): void 
    {
        const wsh = this;

        // Strip request and break it into sections
        const splitUrl = req.url.substring(0, req.url.indexOf("?")).split("/");

        const sessionID = splitUrl.pop();

        // get url params
        //const urlParams = this.getUrlParams(req.url);
        
        ws.on("message", async function message(msg) 
        {
            wsh.processMessage(msg);
        });

        ws.on("close", async (code: number, reason: Buffer) =>
        {
            wsh.processClose(ws, sessionID);
        });

        this.webSockets[sessionID] = ws;
        console.log(`${sessionID} has connected to P2P Helper!`);
    }

    private async processMessage(msg: RawData) {

        const msgStr = msg.toString();

        console.log("received message: " + msgStr);

        const msgSplit = msgStr.split(":");

        if(msgSplit[0] == "server_endpoints")
        {
            // server_endpoints:serverId:stunIp:stunPort:upnpIp:upnpPort:portforwardingIp:portforwardingPort

            const serverId = msgSplit[1];
            const stunIp = msgSplit[2];
            const stunPort = msgSplit[3];
            const upnpIp = msgSplit[4];
            const upnpPort = msgSplit[5];
            const portForwardingIp = msgSplit[6];
            const portForwardingPort = msgSplit[7];

            this.serverEndpoints[serverId] = new EndPoints(stunIp, Number.parseInt(stunPort), upnpIp, Number.parseInt(upnpPort), portForwardingIp, Number.parseInt(portForwardingPort));

            return;
        }

        if(msgSplit[0] == "punch")
        {
            // punch:serverId:profileId:clientPublicIp:clientPublicPort

            const serverId = msgSplit[1];
            const profileId = msgSplit[2];
            const clientPublicIp = msgSplit[3];
            const clientPublicPort = msgSplit[4];

            const serverEndpoint = this.serverEndpoints[serverId];

            // send punch to server (server punches client NAT)
            this.webSockets[serverId].send(`punch:${clientPublicIp}:${clientPublicPort}`);

            // send punch to client (client punches server NAT)
            this.webSockets[profileId].send(`punch:${serverEndpoint.StunIp}:${serverEndpoint.StunPort}`);

            return;
        }
    }

    private async processClose(ws: WebSocket, sessionId: string) {

        // console.log("processClose");
        // console.log(ws);
        console.log(`Web Socket ${sessionId} has disconnected from P2P Helper!`);

        if(this.webSockets[sessionId] !== undefined)
            delete this.webSockets[sessionId];

    }
}