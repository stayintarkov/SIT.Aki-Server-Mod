import { IPmcData } from "../../models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "../../models/eft/itemEvent/IItemEventRouterResponse";
import { PresetBuildCallbacks } from "../../callbacks/PresetBuildCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "../../di/Router";
export declare class PresetBuildItemEventRouter extends ItemEventRouterDefinition {
    protected presetBuildCallbacks: PresetBuildCallbacks;
    constructor(presetBuildCallbacks: PresetBuildCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string): IItemEventRouterResponse;
}
