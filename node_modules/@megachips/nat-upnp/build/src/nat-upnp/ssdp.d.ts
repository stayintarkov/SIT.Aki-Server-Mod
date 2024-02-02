/// <reference types="node" />
import EventEmitter from "events";
export declare class Ssdp implements ISsdp {
    private options?;
    private sourcePort;
    private bound;
    private boundCount;
    private closed;
    private readonly queue;
    private readonly multicast;
    private readonly port;
    private readonly sockets;
    private readonly ssdpEmitter;
    constructor(options?: {
        sourcePort?: number | undefined;
    } | undefined);
    private createSocket;
    private parseResponse;
    search(device: string, emitter?: SsdpEmitter): SsdpEmitter;
    close(): void;
}
export default Ssdp;
type SearchArgs = [Record<string, string>, string];
export type SearchCallback = (...args: SearchArgs) => void;
type SearchEvent = <E extends Events>(ev: E, ...args: E extends "device" ? SearchArgs : []) => boolean;
type Events = "device" | "end";
type Event<E extends Events> = E extends "device" ? SearchCallback : () => void;
type EventListener<T> = <E extends Events>(ev: E, callback: Event<E>) => T;
export interface SsdpEmitter extends EventEmitter {
    removeListener: EventListener<this>;
    addListener: EventListener<this>;
    once: EventListener<this>;
    on: EventListener<this>;
    emit: SearchEvent;
    _ended?: boolean;
}
export interface ISsdp {
    /**
     * Search for a SSDP compatible server on the network
     * @param device Search Type (ST) header, specifying which device to search for
     * @param emitter An existing EventEmitter to emit event on
     * @returns The event emitter provided in Promise, or a newly instantiated one.
     */
    search(device: string, emitter?: SsdpEmitter): SsdpEmitter;
    /**
     * Close all sockets
     */
    close(): void;
}
