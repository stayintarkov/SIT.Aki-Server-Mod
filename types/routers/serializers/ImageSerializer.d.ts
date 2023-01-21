/// <reference types="node" />
import { Serializer } from "../../di/Serializer";
import { ImageRouter } from "../ImageRouter";
import { IncomingMessage, ServerResponse } from "http";
export declare class ImageSerializer extends Serializer {
    protected imageRouter: ImageRouter;
    constructor(imageRouter: ImageRouter);
    serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse, body: any): void;
    canHandle(route: string): boolean;
}
