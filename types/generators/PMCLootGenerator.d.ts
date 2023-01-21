import { ItemHelper } from "../helpers/ItemHelper";
import { IBotConfig } from "../models/spt/config/IBotConfig";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { ItemFilterService } from "../services/ItemFilterService";
/**
 * Handle the generation of dynamic PMC loot in pockets and backpacks
 * and the removal of blacklisted items
 */
export declare class PMCLootGenerator {
    protected itemHelper: ItemHelper;
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected itemFilterService: ItemFilterService;
    protected pocketLootPool: string[];
    protected backpackLootPool: string[];
    protected botConfig: IBotConfig;
    constructor(itemHelper: ItemHelper, databaseServer: DatabaseServer, configServer: ConfigServer, itemFilterService: ItemFilterService);
    generatePMCPocketLootPool(): string[];
    generatePMCBackpackLootPool(): string[];
}
