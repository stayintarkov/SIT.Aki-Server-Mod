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

export class NatHelper {

    public static Instance: NatHelper;
    logger: ILogger;
    public webSockets: Record<string, WebSocket.WebSocket> = {};

    constructor(
        webSocketPort: number,
        logger: ILogger
        )
        { 
            NatHelper.Instance = this;
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
                console.log(`Nat Helper started on port ${webSocketPort}!`);
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
            wsh.processMessage(msg, req);
        });

        ws.on("close", async (code: number, reason: Buffer) =>
        {
            wsh.processClose(ws, sessionID);
        });

        this.webSockets[sessionID] = ws;
        console.log(`${sessionID} has connected to Nat Helper!`);
    }

    // Requests are sent to the serverId (host)
    // Responses are sent back to the requester's profileId (client)

    private async processMessage(msg: RawData, req: IncomingMessage) {

        const msgObj = JSON.parse(msg.toString());

        console.log(msg.toString());

        if(msgObj.requestId !== undefined && msgObj.requestType !== undefined)
        {
            if(msgObj.requestType == "getEndPointsRequest")
            {
                this.webSockets[msgObj.serverId].send(msg.toString());
            }

            if(msgObj.requestType == "natPunchRequest")
            {
                this.webSockets[msgObj.serverId].send(msg.toString());
            }

            if(msgObj.requestType == "getEndPointsResponse")
            {
                // This is a hack to provide the host's external or local IP address
                if(msgObj.publicEndPoints["remote"] !== undefined)
                {
                    const udpPort = msgObj.publicEndPoints["remote"].split(":")[1];

                    msgObj.publicEndPoints["remote"] = `${req.socket.remoteAddress.split(":")[3]}:${udpPort}`;
                }

                console.log(JSON.stringify(msgObj));
                this.webSockets[msgObj.profileId].send(JSON.stringify(msgObj));
            }

            if(msgObj.requestType == "natPunchResponse")
            {
                this.webSockets[msgObj.profileId].send(msg.toString());
            }
        }
    }

    private async processClose(ws: WebSocket, sessionId: string) {

        // console.log("processClose");
        // console.log(ws);
        console.log(`Web Socket ${sessionId} has disconnected from Nat Helper!`);

        if(this.webSockets[sessionId] !== undefined)
            delete this.webSockets[sessionId];

    }
}