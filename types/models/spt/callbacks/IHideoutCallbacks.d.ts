import { IPmcData } from "../../eft/common/IPmcData";
import { IHideoutUpgradeRequestData } from "../../eft/hideout/IHideoutUpgradeRequestData";
import { IHideoutUpgradeCompleteRequestData } from "../../eft/hideout/IHideoutUpgradeCompleteRequestData";
import { IHideoutScavCaseStartRequestData } from "../../eft/hideout/IHideoutScavCaseStartRequestData";
import { IHideoutPutItemInRequestData } from "../../eft/hideout/IHideoutPutItemInRequestData";
import { IHideoutTakeItemOutRequestData } from "../../eft/hideout/IHideoutTakeItemOutRequestData";
import { IHideoutToggleAreaRequestData } from "../../eft/hideout/IHideoutToggleAreaRequestData";
import { IHideoutSingleProductionStartRequestData } from "../../eft/hideout/IHideoutSingleProductionStartRequestData";
import { IHideoutContinuousProductionStartRequestData } from "../../eft/hideout/IHideoutContinuousProductionStartRequestData";
import { IHideoutTakeProductionRequestData } from "../../eft/hideout/IHideoutTakeProductionRequestData";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
export interface IHideoutCallbacks {
    upgrade(pmcData: IPmcData, body: IHideoutUpgradeRequestData, sessionID: string): IItemEventRouterResponse;
    upgradeComplete(pmcData: IPmcData, body: IHideoutUpgradeCompleteRequestData, sessionID: string): IItemEventRouterResponse;
    putItemsInAreaSlots(pmcData: IPmcData, body: IHideoutPutItemInRequestData, sessionID: string): IItemEventRouterResponse;
    takeItemsFromAreaSlots(pmcData: IPmcData, body: IHideoutTakeItemOutRequestData, sessionID: string): IItemEventRouterResponse;
    toggleArea(pmcData: IPmcData, body: IHideoutToggleAreaRequestData, sessionID: string): IItemEventRouterResponse;
    singleProductionStart(pmcData: IPmcData, body: IHideoutSingleProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    scavCaseProductionStart(pmcData: IPmcData, body: IHideoutScavCaseStartRequestData, sessionID: string): IItemEventRouterResponse;
    continuousProductionStart(pmcData: IPmcData, body: IHideoutContinuousProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    takeProduction(pmcData: IPmcData, body: IHideoutTakeProductionRequestData, sessionID: string): IItemEventRouterResponse;
    update(timeSinceLastRun: number): boolean;
}
