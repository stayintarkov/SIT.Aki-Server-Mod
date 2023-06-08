/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import { Serializer } from "../../di/Serializer";
import { ImageRouter } from "../ImageRouter";
export declare class ImageSerializer extends Serializer {
    protected imageRouter: ImageRouter;
    constructor(imageRouter: ImageRouter);
    serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): void;
    canHandle(route: string): boolean;
}
