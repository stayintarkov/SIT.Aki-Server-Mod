import { PresetBuildController } from "../controllers/PresetBuildController";
import { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IGetBodyResponseData } from "../models/eft/httpResponse/IGetBodyResponseData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IPresetBuildActionRequestData } from "../models/eft/presetBuild/IPresetBuildActionRequestData";
import { IRemoveBuildRequestData } from "../models/eft/presetBuild/IRemoveBuildRequestData";
import { IUserBuilds } from "../models/eft/profile/IAkiProfile";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
export declare class PresetBuildCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected presetBuildController: PresetBuildController;
    constructor(httpResponse: HttpResponseUtil, presetBuildController: PresetBuildController);
    /** Handle client/handbook/builds/my/list */
    getHandbookUserlist(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IUserBuilds>;
    /** Handle SaveWeaponBuild event */
    saveWeaponBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle removeBuild event*/
    removeBuild(pmcData: IPmcData, body: IRemoveBuildRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle RemoveWeaponBuild event*/
    removeWeaponBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle SaveEquipmentBuild event */
    saveEquipmentBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle RemoveEquipmentBuild event*/
    removeEquipmentBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
}
