/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import { DependencyContainer } from "tsyringe";
export declare class HttpListenerModService {
    protected container: DependencyContainer;
    constructor(container: DependencyContainer);
    registerHttpListener(name: string, canHandleOverride: (sessionId: string, req: IncomingMessage) => boolean, handleOverride: (sessionId: string, req: IncomingMessage, resp: ServerResponse) => void): void;
}
