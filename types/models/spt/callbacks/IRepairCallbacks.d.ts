import { IPmcData } from "../../eft/common/IPmcData";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
import { IRepairActionDataRequest } from "../../eft/repair/IRepairActionDataRequest";
import { ITraderRepairActionDataRequest } from "../../eft/repair/ITraderRepairActionDataRequest";
export interface IRepairCallbacks {
    traderRepair(pmcData: IPmcData, body: ITraderRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
    repair(pmcData: IPmcData, body: IRepairActionDataRequest, sessionID: string): IItemEventRouterResponse;
}
