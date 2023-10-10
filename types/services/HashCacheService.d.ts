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
    /**
     * Return a stored hash by key
     * @param modName Name of mod to get hash for
     * @returns Mod hash
     */
    getStoredModHash(modName: string): string;
    /**
     * Does the generated hash match the stored hash
     * @param modName name of mod
     * @param modContent
     * @returns True if they match
     */
    modContentMatchesStoredHash(modName: string, modContent: string): boolean;
    hashMatchesStoredHash(modName: string, modHash: string): boolean;
    storeModContent(modName: string, modContent: string): void;
    storeModHash(modName: string, modHash: string): void;
}
