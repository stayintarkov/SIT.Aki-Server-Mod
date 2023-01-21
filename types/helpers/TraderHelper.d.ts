import { FenceLevel } from "../models/eft/common/IGlobals";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { IBarterScheme, ITraderAssort, ITraderBase, LoyaltyLevel } from "../models/eft/common/tables/ITrader";
import { ITraderConfig } from "../models/spt/config/ITraderConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { FenceService } from "../services/FenceService";
import { LocalisationService } from "../services/LocalisationService";
import { PlayerService } from "../services/PlayerService";
import { TimeUtil } from "../utils/TimeUtil";
import { HandbookHelper } from "./HandbookHelper";
import { ItemHelper } from "./ItemHelper";
import { PaymentHelper } from "./PaymentHelper";
import { ProfileHelper } from "./ProfileHelper";
export declare class TraderHelper {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected saveServer: SaveServer;
    protected profileHelper: ProfileHelper;
    protected paymentHelper: PaymentHelper;
    protected itemHelper: ItemHelper;
    protected handbookHelper: HandbookHelper;
    protected playerService: PlayerService;
    protected localisationService: LocalisationService;
    protected fenceService: FenceService;
    protected timeUtil: TimeUtil;
    protected configServer: ConfigServer;
    protected traderConfig: ITraderConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, saveServer: SaveServer, profileHelper: ProfileHelper, paymentHelper: PaymentHelper, itemHelper: ItemHelper, handbookHelper: HandbookHelper, playerService: PlayerService, localisationService: LocalisationService, fenceService: FenceService, timeUtil: TimeUtil, configServer: ConfigServer);
    getTrader(traderID: string, sessionID: string): ITraderBase;
    getTraderAssortsById(traderId: string): ITraderAssort;
    /**
     * Reset a profiles trader data back to its initial state as seen by a level 1 player
     * Does NOT take into account different profile levels
     * @param sessionID session id
     * @param traderID trader id to reset
     */
    resetTrader(sessionID: string, traderID: string): void;
    /**
     * Alter a traders unlocked status
     * @param traderID Trader to alter
     * @param status New status to use
     * @param sessionID Session id
     */
    setTraderUnlockedState(traderID: string, status: boolean, sessionID: string): void;
    /**
     * Get a list of items and their prices from player inventory that can be sold to a trader
     * @param traderID trader id being traded with
     * @param sessionID session id
     * @returns IBarterScheme[][]
     */
    getPurchasesData(traderID: string, sessionID: string): Record<string, IBarterScheme[][]>;
    /**
     * Should item be skipped when selling to trader according to its sell categories and other checks
     * @param pmcData Profile
     * @param item Item to be checked is sellable to trader
     * @param sellCategory categories trader will buy
     * @param traderId Trader item is being checked can be sold to
     * @returns true if should NOT be sold to trader
     */
    protected isItemUnSellableToTrader(pmcData: IPmcData, item: Item, sellCategory: string[], traderId: string): boolean;
    /**
     * Check if item has durability so low it precludes it from being sold to the trader (inclusive)
     * @param item Item to check durability of
     * @param traderId Trader item is sold to
     * @returns
     */
    protected itemIsBelowSellableDurabilityThreshhold(item: Item, traderId: string): boolean;
    /**
     * Get the percentage threshold value a trader will buy armor/weapons above
     * @param traderId Trader to look up
     * @returns percentage
     */
    protected getTraderDurabiltyPurchaseThreshold(traderId: string): number;
    /**
     * Get the price of an item and all of its attached children
     * Take into account bonuses/adjsutments e.g. discounts
     * @param pmcData profile data
     * @param item item to calculate price of
     * @param buyPriceCoefficient
     * @param fenceInfo fence data
     * @param traderBase trader details
     * @param currencyTpl Currency to get price as
     * @returns price of item + children
     */
    protected getAdjustedItemPrice(pmcData: IPmcData, item: Item, buyPriceCoefficient: number, fenceInfo: FenceLevel, traderBase: ITraderBase, currencyTpl: string): number;
    /**
     * Get the raw price of item+child items from handbook without any modification
     * @param pmcData profile data
     * @param item item to calculate price of
     * @returns price as number
     */
    protected getRawItemPrice(pmcData: IPmcData, item: Item): number;
    protected getTraderDiscount(trader: ITraderBase, buyPriceCoefficient: number, fenceInfo: FenceLevel, traderID: string): number;
    /**
     * Add standing to a trader and level them up if exp goes over level threshold
     * @param sessionID Session id
     * @param traderId traders id
     * @param standingToAdd Standing value to add to trader
     */
    addStandingToTrader(sessionID: string, traderId: string, standingToAdd: number): void;
    /**
     * Calculate traders level based on exp amount and increments level if over threshold
     * @param traderID trader to process
     * @param sessionID session id
     */
    lvlUp(traderID: string, sessionID: string): void;
    /**
     * Get the next update timestamp for a trader
     * @param traderID Trader to look up update value for
     * @returns future timestamp
     */
    getNextUpdateTimestamp(traderID: string): number;
    /**
     * Get the reset time between trader assort refreshes in seconds
     * @param traderId Trader to look up
     * @returns Time in seconds
     */
    getTraderUpdateSeconds(traderId: string): number;
    /**
    * check if an item is allowed to be sold to a trader
    * @param categoriesTraderBuys array of allowed categories
    * @param tplToCheck itemTpl of inventory
    * @returns boolean if item can be sold to trader
    */
    doesTraderBuyItem(categoriesTraderBuys: string[], tplToCheck: string): boolean;
    getLoyaltyLevel(traderID: string, pmcData: IPmcData): LoyaltyLevel;
    /**
     * Store the purchase of an assort from a trader in the player profile
     * @param sessionID Session id
     * @param newPurchaseDetails New item assort id + count
     */
    addTraderPurchasesToPlayerProfile(sessionID: string, newPurchaseDetails: {
        items: {
            item_id: string;
            count: number;
        }[];
        tid: string;
    }): void;
}
