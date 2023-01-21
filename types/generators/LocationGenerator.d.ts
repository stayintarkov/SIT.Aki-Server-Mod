import { ContainerHelper } from "../helpers/ContainerHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { RagfairServerHelper } from "../helpers/RagfairServerHelper";
import { ILooseLoot, SpawnpointsForced, SpawnpointTemplate } from "../models/eft/common/ILooseLoot";
import { Item } from "../models/eft/common/tables/IItem";
import { IStaticAmmoDetails, IStaticContainerProps, IStaticForcedProps, IStaticLootDetails } from "../models/eft/common/tables/ILootBase";
import { ILocationConfig } from "../models/spt/config/ILocationConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { LocalisationService } from "../services/LocalisationService";
import { SeasonalEventService } from "../services/SeasonalEventService";
import { JsonUtil } from "../utils/JsonUtil";
import { MathUtil } from "../utils/MathUtil";
import { ObjectId } from "../utils/ObjectId";
import { RandomUtil } from "../utils/RandomUtil";
export interface IContainerItem {
    items: Item[];
    width: number;
    height: number;
}
export declare class LocationGenerator {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected objectId: ObjectId;
    protected randomUtil: RandomUtil;
    protected ragfairServerHelper: RagfairServerHelper;
    protected itemHelper: ItemHelper;
    protected mathUtil: MathUtil;
    protected seasonalEventService: SeasonalEventService;
    protected containerHelper: ContainerHelper;
    protected presetHelper: PresetHelper;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected locationConfig: ILocationConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, objectId: ObjectId, randomUtil: RandomUtil, ragfairServerHelper: RagfairServerHelper, itemHelper: ItemHelper, mathUtil: MathUtil, seasonalEventService: SeasonalEventService, containerHelper: ContainerHelper, presetHelper: PresetHelper, localisationService: LocalisationService, configServer: ConfigServer);
    generateContainerLoot(containerIn: IStaticContainerProps, staticForced: IStaticForcedProps[], staticLootDist: Record<string, IStaticLootDetails>, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, locationName: string): IStaticContainerProps;
    protected getLooseLootMultiplerForLocation(location: string): number;
    protected getStaticLootMultiplerForLocation(location: string): number;
    /**
     * Create array of loose + forced loot using probability system
     * @param dynamicLootDist
     * @param staticAmmoDist
     * @param locationName Location to generate loot for
     * @returns Array of spawn points with loot in them
     */
    generateDynamicLoot(dynamicLootDist: ILooseLoot, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, locationName: string): SpawnpointTemplate[];
    /**
     * Add forced spawn point loot into loot parameter array
     * @param loot array to add forced loot to
     * @param forcedSpawnPoints forced loot to add
     */
    protected addForcedLoot(loot: SpawnpointTemplate[], forcedSpawnPoints: SpawnpointsForced[]): void;
    protected createItem(tpl: string, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, parentId?: string): IContainerItem;
}
