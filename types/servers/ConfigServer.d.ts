import { JsonUtil } from "../utils/JsonUtil";
import { VFS } from "../utils/VFS";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigTypes } from "../models/enums/ConfigTypes";
export declare class ConfigServer {
    protected logger: ILogger;
    protected vfs: VFS;
    protected jsonUtil: JsonUtil;
    protected configs: Record<string, any>;
    constructor(logger: ILogger, vfs: VFS, jsonUtil: JsonUtil);
    getConfig<T>(configType: ConfigTypes): T;
    getConfigByString<T>(configType: string): T;
    initialize(): void;
}
