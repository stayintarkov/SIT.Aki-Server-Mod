import { ILogger } from "../models/spt/utils/ILogger";
import { HashUtil } from "./HashUtil";
import { VFS } from "./VFS";
export declare class JsonUtil {
    protected vfs: VFS;
    protected hashUtil: HashUtil;
    protected logger: ILogger;
    protected fileHashes: any;
    protected jsonCacheExists: boolean;
    constructor(vfs: VFS, hashUtil: HashUtil, logger: ILogger);
    /**
     * From object to string
     * @param data object to turn into JSON
     * @param prettify Should output be prettified?
     * @returns string
     */
    serialize<T>(data: T, prettify?: boolean): string;
    /**
     * From string to object
     * @param jsonString json string to turn into object
     * @returns object
     */
    deserialize<T>(jsonString: string, filename?: string): T;
    deserializeWithCacheCheckAsync<T>(jsonString: string, filePath: string): Promise<T>;
    deserializeWithCacheCheck<T>(jsonString: string, filePath: string): T;
    clone<T>(data: T): T;
}
