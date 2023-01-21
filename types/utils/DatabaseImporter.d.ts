import { OnLoad } from "../di/OnLoad";
import { IDatabaseTables } from "../models/spt/server/IDatabaseTables";
import { ILogger } from "../models/spt/utils/ILogger";
import { ImageRouter } from "../routers/ImageRouter";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocalisationService } from "../services/LocalisationService";
import { JsonUtil } from "./JsonUtil";
import { VFS } from "./VFS";
export declare class DatabaseImporter extends OnLoad {
    protected logger: ILogger;
    protected vfs: VFS;
    protected jsonUtil: JsonUtil;
    protected localisationService: LocalisationService;
    protected databaseServer: DatabaseServer;
    protected imageRouter: ImageRouter;
    constructor(logger: ILogger, vfs: VFS, jsonUtil: JsonUtil, localisationService: LocalisationService, databaseServer: DatabaseServer, imageRouter: ImageRouter);
    onLoad(): Promise<void>;
    /**
     * Read all json files in database folder and map into a json object
     * @param filepath path to database folder
     */
    protected hydrateDatabase(filepath: string): Promise<void>;
    getRoute(): string;
    /**
     * Load files into js objects recursively (asynchronous)
     * @param filepath Path to folder with files
     * @returns
     */
    loadRecursiveAsync(filepath: string): Promise<IDatabaseTables>;
    /**
     * Load files into js objects recursively (synchronous)
     * @param filepath Path to folder with files
     * @returns
     */
    loadRecursive(filepath: string): IDatabaseTables;
    loadImages(filepath: string): void;
}
