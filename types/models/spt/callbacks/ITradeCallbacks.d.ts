import { IPmcData } from "../../eft/common/IPmcData";
import { IProcessRagfairTradeRequestData } from "../../eft/trade/IProcessRagfairTradeRequestData";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
import { IProcessBaseTradeRequestData } from "../../eft/trade/IProcessBaseTradeRequestData";
export interface ITradeCallbacks {
    processTrade(pmcData: IPmcData, body: IProcessBaseTradeRequestData, sessionID: string): IItemEventRouterResponse;
    processRagfairTrade(pmcData: IPmcData, body: IProcessRagfairTradeRequestData, sessionID: string): IItemEventRouterResponse;
}
