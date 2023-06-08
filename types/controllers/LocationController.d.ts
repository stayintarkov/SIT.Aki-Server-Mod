import { LocationGenerator } from "../generators/LocationGenerator";
import { LootGenerator } from "../generators/LootGenerator";
import { WeightedRandomHelper } from "../helpers/WeightedRandomHelper";
import { ILocationBase } from "../models/eft/common/ILocationBase";
import { ILocationsGenerateAllResponse } from "../models/eft/common/ILocationsSourceDestinationBase";
import { AirdropTypeEnum } from "../models/enums/AirdropType";
import { IAirdropConfig } from "../models/spt/config/IAirdropConfig";
import { LootItem } from "../models/spt/services/LootItem";
import { LootRequest } from "../models/spt/services/LootRequest";
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
    protected weightedRandomHelper: WeightedRandomHelper;
    protected logger: ILogger;
    protected locationGenerator: LocationGenerator;
    protected localisationService: LocalisationService;
    protected lootGenerator: LootGenerator;
    protected databaseServer: DatabaseServer;
    protected timeUtil: TimeUtil;
    protected configServer: ConfigServer;
    protected airdropConfig: IAirdropConfig;
    constructor(jsonUtil: JsonUtil, hashUtil: HashUtil, weightedRandomHelper: WeightedRandomHelper, logger: ILogger, locationGenerator: LocationGenerator, localisationService: LocalisationService, lootGenerator: LootGenerator, databaseServer: DatabaseServer, timeUtil: TimeUtil, configServer: ConfigServer);
    get(location: string): ILocationBase;
    generate(name: string): ILocationBase;
    /**
     * Get all maps base location properties without loot data
     * @returns ILocationsGenerateAllResponse
     */
    generateAll(): ILocationsGenerateAllResponse;
    /**
     * Get loot for an airdop container
     * Generates it randomly based on config/airdrop.json values
     * @returns Array of LootItem objects
     */
    getAirdropLoot(): LootItem[];
    /**
     * Randomly pick a type of airdrop loot using weighted values from config
     * @returns airdrop type value
     */
    protected chooseAirdropType(): AirdropTypeEnum;
    /**
     * Get the configuration for a specific type of airdrop
     * @param airdropType Type of airdrop to get settings for
     * @returns LootRequest
     */
    protected getAirdropLootConfigByType(airdropType: AirdropTypeEnum): LootRequest;
}
