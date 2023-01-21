import { RepairController } from "../controllers/RepairController";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IRepairActionDataRequest } from "../models/eft/repair/IRepairActionDataRequest";
import { ITraderRepairActionDataRequest } from "../models/eft/repair/ITraderRepairActionDataRequest";
export declare class RepairCallbacks {
    protected repairController: RepairController;
    constructor(repairController: RepairController);
    /**
     * use trader to repair item
     * @param pmcData
     * @param body
     * @param sessionID
     * @returns
     */
    traderRepair(pmcData: IPmcData, body: ITraderRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
    /**
     * Use repair kit to repair item
     * @param pmcData
     * @param body
     * @param sessionID
     * @returns
     */
    repair(pmcData: IPmcData, body: IRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
}
