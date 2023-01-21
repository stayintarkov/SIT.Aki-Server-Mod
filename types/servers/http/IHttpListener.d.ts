/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
export interface IHttpListener {
    canHandle(sessionId: string, req: IncomingMessage): boolean;
    handle(sessionId: string, req: IncomingMessage, resp: ServerResponse): void;
}
