import { ILogger } from "../models/spt/utils/ILogger";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { VFS } from "../utils/VFS";
export declare class HashCacheService {
    protected vfs: VFS;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected logger: ILogger;
    protected jsonHashes: any;
    protected modHashes: any;
    protected readonly modCachePath = "./user/cache/modCache.json";
    constructor(vfs: VFS, hashUtil: HashUtil, jsonUtil: JsonUtil, logger: ILogger);
    getStoredModHash(modName: string): string;
    modContentMatchesStoredHash(modName: string, modContent: string): boolean;
    hashMatchesStoredHash(modName: string, modHash: string): boolean;
    storeModContent(modName: string, modContent: string): void;
    storeModHash(modName: string, modHash: string): void;
}
