import { CompilerOptions } from "typescript";
import type { ILogger } from "../models/spt/utils/ILogger";
import { VFS } from "../utils/VFS";
import { HashCacheService } from "./HashCacheService";
export declare class ModCompilerService {
    protected logger: ILogger;
    protected hashCacheService: HashCacheService;
    protected vfs: VFS;
    protected serverDependencies: string[];
    constructor(logger: ILogger, hashCacheService: HashCacheService, vfs: VFS);
    /**
     * Convert a mods TS into JS
     * @param modName Name of mod
     * @param modPath Dir path to mod
     * @param modTypeScriptFiles
     * @returns
     */
    compileMod(modName: string, modPath: string, modTypeScriptFiles: string[]): Promise<void>;
    /**
     * Convert a TS file into JS
     * @param fileNames Paths to TS files
     * @param options Compiler options
     */
    protected compile(fileNames: string[], options: CompilerOptions): Promise<void>;
    /**
     * Do the files at the provided paths exist
     * @param fileNames
     * @returns
     */
    protected areFilesReady(fileNames: string[]): boolean;
    /**
     * Wait the provided number of milliseconds
     * @param ms Milliseconds
     * @returns
     */
    protected delay(ms: number): Promise<unknown>;
}
