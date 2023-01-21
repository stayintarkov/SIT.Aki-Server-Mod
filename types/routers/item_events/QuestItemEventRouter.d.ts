import { QuestCallbacks } from "../../callbacks/QuestCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "../../di/Router";
import { IPmcData } from "../../models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "../../models/eft/itemEvent/IItemEventRouterResponse";
import { ILogger } from "../../models/spt/utils/ILogger";
export declare class QuestItemEventRouter extends ItemEventRouterDefinition {
    protected logger: ILogger;
    protected questCallbacks: QuestCallbacks;
    constructor(logger: ILogger, questCallbacks: QuestCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(eventAction: string, pmcData: IPmcData, body: any, sessionID: string): IItemEventRouterResponse;
}
