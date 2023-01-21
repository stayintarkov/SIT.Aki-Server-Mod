/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
export declare class Serializer {
    serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): void;
    canHandle(something: string): boolean;
}
