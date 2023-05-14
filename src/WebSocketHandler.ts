import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IncomingMessage } from "http";
import WebSocket from "ws";
import { CoopMatch } from "./CoopMatch";

export class WebSocketHandler {

    public webSockets: Record<string, WebSocket.WebSocket> = {};
    logger: ILogger;
    public static Instance: WebSocketHandler;

    constructor(
        webSocketPort: number
        , logger: ILogger
        )
        { 
            WebSocketHandler.Instance = this;
            this.logger = logger;
            const webSocketServer = new WebSocket.Server({
                "port": webSocketPort
            });
    
            webSocketServer.addListener("listening", () => 
            {
                console.log(`=======================================================================`);
                console.log(`COOP MOD: Web Socket Server is listening on ${webSocketPort}`);
                console.log(`A temporary Web Socket Server until SPT-Aki open theirs up for modding!`);
                console.log(`=======================================================================`);
            });
    
            webSocketServer.addListener("connection", this.wsOnConnection.bind(this));
        }

    protected wsOnConnection(ws: WebSocket.WebSocket, req: IncomingMessage): void 
    {
        const wsh = this;
        // Strip request and break it into sections
        const splitUrl = req.url.substring(0, req.url.indexOf("?")).split("/");
        const sessionID = splitUrl.pop();

        console.log(`${sessionID} has connected to Coop Web Socket`);

        ws.on("message", async function message(msg) 
        {


            const msgStr = msg.toString();
            if(msgStr.charAt(0) !== '{')
                return;

            // console.log(`${sessionID} sent ${msg}`)


            var jsonObject = JSON.parse(msgStr);

            const match = CoopMatch.CoopMatches[jsonObject["serverId"]];
            if(match !== undefined) {

                if(jsonObject["connect"] == true) {
                    match.PlayerJoined(jsonObject["accountId"]);
                }
                else {
                    // console.log("found match");
                    match.ProcessData(jsonObject, wsh.logger);
                }
            }

            wsh.sendToAllWebSockets(JSON.stringify(jsonObject));

        });

        this.webSockets[sessionID] = ws;
    }

    public sendToAllWebSockets(data: string) {
        for(let session in this.webSockets) {
            this.webSockets[session].send(data);
        }
    }

    public sendToWebSockets(sessions: string[], data: string) {
        for(let session of sessions) {
            if(this.webSockets[session] !== undefined)
                this.webSockets[session].send(data);
        }
    }
}