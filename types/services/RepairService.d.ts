import { QuestHelper } from "../helpers/QuestHelper";
import { RepairHelper } from "../helpers/RepairHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { RepairKitsInfo } from "../models/eft/repair/IRepairActionDataRequest";
import { RepairItem } from "../models/eft/repair/ITraderRepairActionDataRequest";
import { IRepairConfig } from "../models/spt/config/IRepairConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { PaymentService } from "./PaymentService";
export declare class RepairService {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected questHelper: QuestHelper;
    protected traderHelper: TraderHelper;
    protected paymentService: PaymentService;
    protected repairHelper: RepairHelper;
    protected configServer: ConfigServer;
    repairConfig: IRepairConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, questHelper: QuestHelper, traderHelper: TraderHelper, paymentService: PaymentService, repairHelper: RepairHelper, configServer: ConfigServer);
    /**
     * Use trader to repair an items durability
     * @param sessionID Session id
     * @param pmcData profile to find item to repair in
     * @param repairItemDetails details of the item to repair
     * @param traderId Trader being used to repair item
     * @returns RepairDetails object
     */
    repairItemByTrader(sessionID: string, pmcData: IPmcData, repairItemDetails: RepairItem, traderId: string): RepairDetails;
    /**
     *
     * @param sessionID Session id
     * @param pmcData profile to take money from
     * @param repairedItemId Repaired item id
     * @param repairCost Cost to repair item in roubles
     * @param traderId Id of the trader who repaired the item / who is paid
     * @param output
     */
    payForRepair(sessionID: string, pmcData: IPmcData, repairedItemId: string, repairCost: number, traderId: string, output: IItemEventRouterResponse): void;
    /**
     * Add skill points to profile after repairing an item
     * @param sessionId Session id
     * @param repairDetails details of item repaired, cost/item
     * @param pmcData Profile to add points to
     * @param output IItemEventRouterResponse
     */
    addRepairSkillPoints(sessionId: string, repairDetails: RepairDetails, pmcData: IPmcData, output: IItemEventRouterResponse): void;
    /**
     *
     * @param sessionId Session id
     * @param pmcData Profile to update repaired item in
     * @param repairKits Array of Repair kits to use
     * @param itemToRepairId Item id to repair
     * @param output IItemEventRouterResponse
     * @returns Details of repair, item/price
     */
    repairItemByKit(sessionId: string, pmcData: IPmcData, repairKits: RepairKitsInfo[], itemToRepairId: string, output: IItemEventRouterResponse): RepairDetails;
    /**
     * Update repair kits Resource object if it doesn't exist
     * @param repairKitDetails Repair kit details from db
     * @param repairKitInInventory Repair kit to update
     */
    protected addMaxResourceToKitIfMissing(repairKitDetails: ITemplateItem, repairKitInInventory: Item): void;
}
export declare class RepairDetails {
    repairCost?: number;
    repairedItem: Item;
    repairedItemIsArmor: boolean;
}
