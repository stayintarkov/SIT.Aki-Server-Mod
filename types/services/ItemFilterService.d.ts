import { IItemConfig } from "../models/spt/config/IItemConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
/** Centralise the handling of blacklisting items, uses blacklist found in config/item.json, stores items that should not be used by players / broken items */
export declare class ItemFilterService {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected blacklist: string[];
    protected itemConfig: IItemConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, configServer: ConfigServer);
    /**
     * Check if the provided template id is blacklisted in config/item.json
     * @param tpl template id
     * @returns true if blacklisted
     */
    isItemBlacklisted(tpl: string): boolean;
    /**
     * Return every template id blacklisted in config/item.json
     * @returns string array of blacklisted tempalte ids
     */
    getBlacklistedItems(): string[];
}
