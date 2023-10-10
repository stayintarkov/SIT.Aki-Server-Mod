import { SellResult } from "../models/eft/ragfair/IRagfairOffer";
import { IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class RagfairSellHelper {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, timeUtil: TimeUtil, configServer: ConfigServer);
    /**
     * Get the percent chance to sell an item based on its average listed price vs player chosen listing price
     * @param averageOfferPriceRub Price of average offer in roubles
     * @param playerListedPriceRub Price player listed item for in roubles
     * @param qualityMultiplier Quality multipler of item being sold
     * @returns percent value
     */
    calculateSellChance(averageOfferPriceRub: number, playerListedPriceRub: number, qualityMultiplier: number): number;
    /**
     * Get percent chance to sell an item when price is below items average listing price
     * @param playerListedPriceRub Price player listed item for in roubles
     * @param averageOfferPriceRub Price of average offer in roubles
     * @returns percent value
     */
    protected getSellMultiplierWhenPlayerPriceIsBelowAverageListingPrice(averageOfferPriceRub: number, playerListedPriceRub: number): number;
    /**
     * Get array of item count and sell time (empty array = no sell)
     * @param sellChancePercent chance item will sell
     * @param itemSellCount count of items to sell
     * @returns Array of purchases of item(s) listed
     */
    rollForSale(sellChancePercent: number, itemSellCount: number): SellResult[];
}
