import { ItemHelper } from "../helpers/ItemHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IPresetBuildActionRequestData } from "../models/eft/presetBuild/IPresetBuildActionRequestData";
import { IRemoveBuildRequestData } from "../models/eft/presetBuild/IRemoveBuildRequestData";
import { IUserBuilds } from "../models/eft/profile/IAkiProfile";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
export declare class PresetBuildController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected jsonUtil: JsonUtil;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected saveServer: SaveServer;
    constructor(logger: ILogger, hashUtil: HashUtil, eventOutputHolder: EventOutputHolder, jsonUtil: JsonUtil, databaseServer: DatabaseServer, itemHelper: ItemHelper, saveServer: SaveServer);
    /** Handle client/handbook/builds/my/list */
    getUserBuilds(sessionID: string): IUserBuilds;
    /** Handle SaveWeaponBuild event */
    saveWeaponBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionId: string): IItemEventRouterResponse;
    /** Handle SaveEquipmentBuild event */
    saveEquipmentBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    protected saveBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string, buildType: string): IItemEventRouterResponse;
    /** Handle RemoveWeaponBuild event*/
    removeBuild(pmcData: IPmcData, body: IRemoveBuildRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle RemoveWeaponBuild event*/
    removeWeaponBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle RemoveEquipmentBuild event*/
    removeEquipmentBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    protected removePlayerBuild(pmcData: IPmcData, id: string, sessionID: string): IItemEventRouterResponse;
}
