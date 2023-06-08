import { IPmcData } from "../models/eft/common/IPmcData";
import { ITraderAssort, ITraderBase, LoyaltyLevel } from "../models/eft/common/tables/ITrader";
import { ITraderConfig } from "../models/spt/config/ITraderConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { FenceService } from "../services/FenceService";
import { LocalisationService } from "../services/LocalisationService";
import { PlayerService } from "../services/PlayerService";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { HandbookHelper } from "./HandbookHelper";
import { ItemHelper } from "./ItemHelper";
import { ProfileHelper } from "./ProfileHelper";
export declare class TraderHelper {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected saveServer: SaveServer;
    protected profileHelper: ProfileHelper;
    protected handbookHelper: HandbookHelper;
    protected itemHelper: ItemHelper;
    protected playerService: PlayerService;
    protected localisationService: LocalisationService;
    protected fenceService: FenceService;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected configServer: ConfigServer;
    protected traderConfig: ITraderConfig;
    /** Dictionary of item tpl and the highest trader sell rouble price */
    protected highestTraderPriceItems: Record<string, number>;
    /** Dictionary of item tpl and the highest trader buy back rouble price */
    protected highestTraderBuyPriceItems: Record<string, number>;
    constructor(logger: ILogger, databaseServer: DatabaseServer, saveServer: SaveServer, profileHelper: ProfileHelper, handbookHelper: HandbookHelper, itemHelper: ItemHelper, playerService: PlayerService, localisationService: LocalisationService, fenceService: FenceService, timeUtil: TimeUtil, randomUtil: RandomUtil, configServer: ConfigServer);
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
     * @param traderId Trader to alter
     * @param status New status to use
     * @param sessionId Session id
     */
    setTraderUnlockedState(traderId: string, status: boolean, sessionId: string): void;
    /**
     * Add standing to a trader and level them up if exp goes over level threshold
     * @param sessionId Session id
     * @param traderId Traders id
     * @param standingToAdd Standing value to add to trader
     */
    addStandingToTrader(sessionId: string, traderId: string, standingToAdd: number): void;
    /**
     * Add standing to current standing and clamp value if it goes too low
     * @param currentStanding current trader standing
     * @param standingToAdd stansding to add to trader standing
     * @returns current standing + added standing (clamped if needed)
     */
    protected addStandingValuesTogether(currentStanding: number, standingToAdd: number): number;
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
    /**
     * Get the highest rouble price for an item from traders
     * UNUSED
     * @param tpl Item to look up highest pride for
     * @returns highest rouble cost for item
     */
    getHighestTraderPriceRouble(tpl: string): number;
    /**
     * Get the highest price item can be sold to trader for (roubles)
     * @param tpl Item to look up best trader sell-to price
     * @returns Rouble price
     */
    getHighestSellToTraderPrice(tpl: string): number;
}
