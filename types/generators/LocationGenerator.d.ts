import { ContainerHelper } from "../helpers/ContainerHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { RagfairServerHelper } from "../helpers/RagfairServerHelper";
import { ILooseLoot, Spawnpoint, SpawnpointsForced, SpawnpointTemplate } from "../models/eft/common/ILooseLoot";
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
    /**
     * Choose loot to put into a static container
     * @param containerIn
     * @param staticForced
     * @param staticLootDist
     * @param staticAmmoDist
     * @param locationName Name of the map to generate static loot for
     * @returns IStaticContainerProps
     */
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
     * @param name of map currently generating forced loot for
     */
    protected addForcedLoot(loot: SpawnpointTemplate[], forcedSpawnPoints: SpawnpointsForced[], locationName: string): void;
    /**
     * Create array of item (with child items) and return
     * @param chosenComposedKey Key we want to look up items for
     * @param spawnPoint Dynamic spawn point item we want will be placed in
     * @returns IContainerItem
     */
    protected createDynamicLootItem(chosenComposedKey: string, spawnPoint: Spawnpoint): IContainerItem;
    /**
     * Replace the _id value for base item + all children items parentid value
     * @param itemWithChildren Item with mods to update
     * @param newId new id to add on chidren of base item
     */
    protected reparentItemAndChildren(itemWithChildren: Item[], newId?: string): void;
    /**
     * Find an item in array by its _tpl, handle differently if chosenTpl is a weapon
     * @param items Items array to search
     * @param chosenTpl Tpl we want to get item with
     * @returns Item object
     */
    protected getItemInArray(items: Item[], chosenTpl: string): Item;
    protected createStaticLootItem(tpl: string, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, parentId?: string): IContainerItem;
}
