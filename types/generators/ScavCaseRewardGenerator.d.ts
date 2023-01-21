import { ItemHelper } from "../helpers/ItemHelper";
import { Product } from "../models/eft/common/tables/IBotBase";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { IHideoutScavCase } from "../models/eft/hideout/IHideoutScavCase";
import { IHideoutScavCaseStartRequestData } from "../models/eft/hideout/IHideoutScavCaseStartRequestData";
import { IScavCaseConfig } from "../models/spt/config/IScavCaseConfig";
import { RewardCountAndPriceDetails, ScavCaseRewardCountsAndPrices } from "../models/spt/hideout/ScavCaseRewardCountsAndPrices";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { ItemFilterService } from "../services/ItemFilterService";
import { RagfairPriceService } from "../services/RagfairPriceService";
import { HashUtil } from "../utils/HashUtil";
import { RandomUtil } from "../utils/RandomUtil";
/**
 * Handle the creation of randomised scav case rewards
 */
export declare class ScavCaseRewardGenerator {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected databaseServer: DatabaseServer;
    protected ragfairPriceService: RagfairPriceService;
    protected itemFilterService: ItemFilterService;
    protected configServer: ConfigServer;
    protected scavCaseConfig: IScavCaseConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, hashUtil: HashUtil, itemHelper: ItemHelper, databaseServer: DatabaseServer, ragfairPriceService: RagfairPriceService, itemFilterService: ItemFilterService, configServer: ConfigServer);
    /**
     * Create an array of rewards that will be given to the player upon completing their scav case build
     * @param body client request
     * @returns Product array
     */
    generate(body: IHideoutScavCaseStartRequestData): Product[];
    /**
     * Get all db items that are not blacklisted in scavcase config
     * @returns filtered array of db items
     */
    protected getDbItems(): ITemplateItem[];
    /**
     * Pick a number of items to be rewards, the count is defined by the values in
     * @param items item pool to pick rewards from
     * @param itemFilters how the rewards should be filtered down (by item count)
     * @returns
     */
    protected pickRandomRewards(items: ITemplateItem[], itemFilters: RewardCountAndPriceDetails, rarity: string): ITemplateItem[];
    /**
     * Choose if money should be a reward based on the moneyRewardChancePercent config chance in scavCaseConfig
     * @returns true if reward should be money
     */
    protected rewardShouldBeMoney(): boolean;
    /**
     * Choose if ammo should be a reward based on the ammoRewardChancePercent config chance in scavCaseConfig
     * @returns true if reward should be ammo
     */
    protected rewardShouldBeAmmo(): boolean;
    /**
     * Choose from rouble/dollar/euro at random
     */
    protected getRandomMoney(): ITemplateItem;
    /**
     * Get a random ammo from items.json that is not in the ammo blacklist AND inside the price rage defined in scavcase.json config
     * @param rarity The rarity this ammo reward is for
     * @returns random ammo item from items.json
     */
    protected getRandomAmmo(rarity: string): ITemplateItem;
    /**
     * Take all the rewards picked create the Product object array ready to return to calling code
     * Also add a stack count to ammo and money
     * @param rewardItems items to convert
     * @returns Product array
     */
    protected randomiseContainerItemRewards(rewardItems: ITemplateItem[], rarity: string): Product[];
    /**
     * Add a randomised stack count to ammo or money items
     * @param item money or ammo item
     * @param resultItem money or ammo item with a randomise stack size
     */
    protected addStackCountToAmmoAndMoney(item: ITemplateItem, resultItem: {
        _id: string;
        _tpl: string;
        upd: any;
    }, rarity: string): void;
    /**
     *
     * @param dbItems all items from the items.json
     * @param itemFilters controls how the dbItems will be filtered and returned (handbook price)
     * @returns filtered dbItems array
     */
    protected getFilteredItemsByPrice(dbItems: ITemplateItem[], itemFilters: RewardCountAndPriceDetails): ITemplateItem[];
    /**
     * Gathers the reward options from config and scavcase.json into a single object
     * @param scavCaseDetails scavcase.json values
     * @returns ScavCaseRewardCountsAndPrices object
     */
    protected getScavCaseRewardCountsAndPrices(scavCaseDetails: IHideoutScavCase): ScavCaseRewardCountsAndPrices;
    /**
     * Randomises the size of ammo and money stacks
     * @param itemToCalculate ammo or money item
     * @param rarity rarity (common/rare/superrare)
     * @returns value to set stack count to
     */
    protected getRandomAmountRewardForScavCase(itemToCalculate: ITemplateItem, rarity: string): number;
}
