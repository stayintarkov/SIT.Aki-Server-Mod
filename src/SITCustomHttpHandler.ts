import tsyringe = require("tsyringe");
import { AkiHttpListener } from "@spt-aki/servers/http/AkiHttpListener";
import { HttpBufferHandler } from "@spt-aki/servers/http/HttpBufferHandler";
import { IncomingMessage, ServerResponse } from "http";
import zlib from "zlib";

export class SITCustomHttpHandler {

    httpBufferHandler: HttpBufferHandler;

    constructor(container: tsyringe.DependencyContainer) {
        this.httpBufferHandler  = container.resolve<HttpBufferHandler>("HttpBufferHandler");
    }
    /**
     * This replaces Aki's Http Handler with a much better one that can handle large POST requests without an error
     * @param sessionId 
     * @param req 
     * @param resp 
     * @param result 
     */
    public sitHttpHandler(sessionId: string, req: IncomingMessage, resp: ServerResponse, result: AkiHttpListener)
    {
        // TODO: cleanup into interface IVerbHandler
        switch (req.method)
        {
            case "GET":
            {
                const response = result.getResponse(sessionId, req, null);
                result.sendResponse(sessionId, req, resp, null, response);
                break;
            }
            case "POST":
            {
                req.on("data", (data: any) =>
                {
                    if (sessionId === undefined)
                        sessionId = "launcher";

                    const requestLength = parseInt(req.headers["content-length"]);
                            
                    if (!this.httpBufferHandler.putInBuffer(sessionId, data, requestLength))
                    {
                        resp.writeContinue();
                    }
                });

                req.on("end", () =>
                {
                    if (sessionId === undefined)
                        sessionId = "launcher";

                    const data = this.httpBufferHandler.getFromBuffer(sessionId);
                    const value = (req.headers["debug"] === "1") ? data.toString() : zlib.inflateSync(data);
                    if (req.headers["debug"] === "1") 
                    {
                        console.log(value.toString());
                    }
                    this.httpBufferHandler.resetBuffer(sessionId);
                    
                    const response = result.getResponse(sessionId, req, value);
                    result.sendResponse(sessionId, req, resp, value, response);
                });

                
                break;
            }
            case "PUT":
            {
                req.on("data", (data) =>
                {
                    // receive data
                    //if ("expect" in req.headers)
                    {
                        const requestLength = parseInt(req.headers["content-length"]);
                            
                        if (!this.httpBufferHandler.putInBuffer(req.headers.sessionid, data, requestLength))
                        {
                            resp.writeContinue();
                        }
                    }
                });
                    
                req.on("end", async () =>
                {
                    const data = this.httpBufferHandler.getFromBuffer(sessionId);
                    this.httpBufferHandler.resetBuffer(sessionId);
                    
                    let value = zlib.inflateSync(data);
                    if (!value)
                    {
                        value = data;
                    }
                    const response = result.getResponse(sessionId, req, value);
                    result.sendResponse(sessionId, req, resp, value, response);
                });
                break;
            }
            default:
            {
                break;
            }
        }
    }


}