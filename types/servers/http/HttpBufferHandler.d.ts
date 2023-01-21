export declare class HttpBufferHandler {
    protected buffers: {};
    resetBuffer(sessionID: string): void;
    putInBuffer(sessionID: any, data: any, bufLength: number): boolean;
    getFromBuffer(sessionID: string): any;
}
