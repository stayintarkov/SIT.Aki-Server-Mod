import { InventoryHelper } from "../helpers/InventoryHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Item, Upd } from "../models/eft/common/tables/IItem";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IProcessBuyTradeRequestData } from "../models/eft/trade/IProcessBuyTradeRequestData";
import { IProcessSellTradeRequestData } from "../models/eft/trade/IProcessSellTradeRequestData";
import { ITraderConfig } from "../models/spt/config/ITraderConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ConfigServer } from "../servers/ConfigServer";
import { RagfairServer } from "../servers/RagfairServer";
import { FenceService } from "../services/FenceService";
import { PaymentService } from "../services/PaymentService";
export declare class TradeHelper {
    protected logger: ILogger;
    protected eventOutputHolder: EventOutputHolder;
    protected traderHelper: TraderHelper;
    protected itemHelper: ItemHelper;
    protected paymentService: PaymentService;
    protected fenceService: FenceService;
    protected inventoryHelper: InventoryHelper;
    protected ragfairServer: RagfairServer;
    protected configServer: ConfigServer;
    protected traderConfig: ITraderConfig;
    constructor(logger: ILogger, eventOutputHolder: EventOutputHolder, traderHelper: TraderHelper, itemHelper: ItemHelper, paymentService: PaymentService, fenceService: FenceService, inventoryHelper: InventoryHelper, ragfairServer: RagfairServer, configServer: ConfigServer);
    /**
     * Buy item from flea or trader
     * @param pmcData
     * @param buyRequestData data from client
     * @param sessionID
     * @param foundInRaid
     * @param upd optional item details used when buying from flea
     * @returns
     */
    buyItem(pmcData: IPmcData, buyRequestData: IProcessBuyTradeRequestData, sessionID: string, foundInRaid: boolean, upd: Upd): IItemEventRouterResponse;
    /**
     * Sell item to trader
     * @param pmcData Profile to update
     * @param body
     * @param sessionID
     * @returns
     */
    sellItem(pmcData: IPmcData, body: IProcessSellTradeRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Increment the assorts buy count by number of items purchased
     * Show error on screen if player attepts to buy more than what the buy max allows
     * @param assortBeingPurchased assort being bought
     * @param itemsPurchasedCount number of items being bought
     */
    protected incrementAssortBuyCount(assortBeingPurchased: Item, itemsPurchasedCount: number): void;
    protected checkPurchaseIsWithinTraderItemLimit(assortBeingPurchased: Item, assortId: string, count: number): void;
}
