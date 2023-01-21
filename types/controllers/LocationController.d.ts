import { LocationGenerator } from "../generators/LocationGenerator";
import { LootGenerator } from "../generators/LootGenerator";
import { ILocationBase } from "../models/eft/common/ILocationBase";
import { ILocationsGenerateAllResponse } from "../models/eft/common/ILocationsSourceDestinationBase";
import { IAirdropConfig } from "../models/spt/config/IAirdropConfig";
import { LootItem } from "../models/spt/services/LootItem";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocalisationService } from "../services/LocalisationService";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class LocationController {
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected logger: ILogger;
    protected locationGenerator: LocationGenerator;
    protected localisationService: LocalisationService;
    protected lootGenerator: LootGenerator;
    protected databaseServer: DatabaseServer;
    protected timeUtil: TimeUtil;
    protected configServer: ConfigServer;
    protected airdropConfig: IAirdropConfig;
    constructor(jsonUtil: JsonUtil, hashUtil: HashUtil, logger: ILogger, locationGenerator: LocationGenerator, localisationService: LocalisationService, lootGenerator: LootGenerator, databaseServer: DatabaseServer, timeUtil: TimeUtil, configServer: ConfigServer);
    get(location: string): ILocationBase;
    generate(name: string): ILocationBase;
    generateAll(): ILocationsGenerateAllResponse;
    /**
     * Get loot for an airdop container
     * Generates it randomly based on config/airdrop.json values
     * @returns Array of LootItem
     */
    getAirdropLoot(): LootItem[];
}
