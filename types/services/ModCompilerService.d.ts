import { CompilerOptions } from "typescript";
import type { ILogger } from "../models/spt/utils/ILogger";
import { HashCacheService } from "./HashCacheService";
import { VFS } from "../utils/VFS";
export declare class ModCompilerService {
    protected logger: ILogger;
    protected hashCacheService: HashCacheService;
    protected vfs: VFS;
    constructor(logger: ILogger, hashCacheService: HashCacheService, vfs: VFS);
    compileMod(modName: string, modPath: string, modTypeScriptFiles: string[]): Promise<void>;
    protected compile(fileNames: string[], options: CompilerOptions): Promise<void>;
    protected areFilesReady(fileNames: string[]): boolean;
    protected delay(ms: number): Promise<unknown>;
}
