import { HandbookHelper } from "../helpers/HandbookHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { FenceLevel } from "../models/eft/common/IGlobals";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { ITraderAssort } from "../models/eft/common/tables/ITrader";
import { ITraderConfig } from "../models/spt/config/ITraderConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { ItemFilterService } from "./ItemFilterService";
import { LocalisationService } from "./LocalisationService";
/**
 * Handle actions surrounding Fence
 * e.g. generating or refreshing assorts / get next refresh time
 */
export declare class FenceService {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected itemFilterService: ItemFilterService;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected fenceAssort: ITraderAssort;
    protected traderConfig: ITraderConfig;
    protected nextMiniRefreshTimestamp: number;
    constructor(logger: ILogger, hashUtil: HashUtil, jsonUtil: JsonUtil, timeUtil: TimeUtil, randomUtil: RandomUtil, databaseServer: DatabaseServer, handbookHelper: HandbookHelper, itemHelper: ItemHelper, presetHelper: PresetHelper, itemFilterService: ItemFilterService, localisationService: LocalisationService, configServer: ConfigServer);
    protected setFenceAssort(fenceAssort: ITraderAssort): void;
    /**
     * Get assorts player can purchase
     * Adjust prices based on fence level of player
     * @param pmcProfile Player profile
     * @returns ITraderAssort
     */
    getFenceAssorts(pmcProfile: IPmcData): ITraderAssort;
    /**
     * Adjust assorts price by a modifier
     * @param item
     * @param assort
     * @param modifier
     */
    protected adjustItemPriceByModifier(item: Item, assort: ITraderAssort, modifier: number): void;
    /**
     * Get fence assorts with no price adjustments based on fence rep
     * @returns ITraderAssort
     */
    getRawFenceAssorts(): ITraderAssort;
    /**
     * Does fence need to perform a partial refresh because its passed the refresh timer defined in trader.json
     * @returns true if it needs a partial refresh
     */
    needsPartialRefresh(): boolean;
    /**
     * Replace a percentage of fence assorts with freshly generated items
     */
    performPartialRefresh(): void;
    /**
     * Increment fence next refresh timestamp by current timestamp + partialRefreshTimeSeconds from config
     */
    protected incrementPartialRefreshTime(): void;
    /**
     * Compare the current fence offer count to what the config wants it to be,
     * If value is lower add extra count to value to generate more items to fill gap
     * @param existingItemCountToReplace count of items to generate
     * @returns number of items to generate
     */
    protected getCountOfItemsToGenerate(existingItemCountToReplace: number): number;
    /**
     * Choose an item (not mod) at random and remove from assorts
     */
    protected removeRandomItemFromAssorts(): void;
    /**
     * Get an integer rounded count of items to replace based on percentrage from traderConfig value
     * @param totalItemCount total item count
     * @returns rounded int of items to replace
     */
    protected getCountOfItemsToReplace(totalItemCount: number): number;
    /**
     * Get the count of items fence offers
     * @returns number
     */
    getOfferCount(): number;
    /**
     * Create trader assorts for fence and store in fenceService cache
     */
    generateFenceAssorts(): void;
    /**
     * Create skeleton to hold assort items
     * @returns ITraderAssort object
     */
    protected createBaseTraderAssortItem(): ITraderAssort;
    /**
     * Hydrate result parameter object with generated assorts
     * @param assortCount Number of assorts to generate
     * @param assorts object to add assorts to
     */
    protected createAssorts(assortCount: number, assorts: ITraderAssort): void;
    /**
     * Randomise items' upd properties e.g. med packs/weapons/armor
     * @param itemDetails Item being randomised
     * @param itemToAdjust Item being edited
     */
    protected randomiseItemUpdProperties(itemDetails: ITemplateItem, itemToAdjust: Item): void;
    /**
     * Construct item limit record to hold max and current item count
     * @param limits limits as defined in config
     * @returns record, key: item tplId, value: current/max item count allowed
     */
    protected initItemLimitCounter(limits: Record<string, number>): Record<string, {
        current: number;
        max: number;
    }>;
    /**
     * Get the next update timestamp for fence
     * @returns future timestamp
     */
    getNextFenceUpdateTimestamp(): number;
    /**
     * Get fence refresh time in seconds
     */
    protected getFenceRefreshTime(): number;
    /**
     * Get fence level the passed in profile has
     * @param pmcData Player profile
     * @returns FenceLevel object
     */
    getFenceInfo(pmcData: IPmcData): FenceLevel;
    /**
     * Remove an assort from fence by id
     * @param assortIdToRemove assort id to remove from fence assorts
     */
    removeFenceOffer(assortIdToRemove: string): void;
}
