import { IAsyncQueue } from "../../models/spt/utils/IAsyncQueue";
import { IUUidGenerator } from "../../models/spt/utils/IUuidGenerator";
import { AbstractWinstonLogger } from "./AbstractWinstonLogger";
export declare class WinstonRequestLogger extends AbstractWinstonLogger {
    protected asyncQueue: IAsyncQueue;
    protected uuidGenerator: IUUidGenerator;
    constructor(asyncQueue: IAsyncQueue, uuidGenerator: IUUidGenerator);
    protected isLogExceptions(): boolean;
    protected isLogToFile(): boolean;
    protected isLogToConsole(): boolean;
    protected getFilePath(): string;
    protected getFileName(): string;
    protected getLogMaxSize(): string;
}
