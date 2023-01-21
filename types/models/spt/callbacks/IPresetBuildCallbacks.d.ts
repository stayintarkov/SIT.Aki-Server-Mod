import { IPmcData } from "../../eft/common/IPmcData";
import { IPresetBuildActionRequestData } from "../../eft/presetBuild/IPresetBuildActionRequestData";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
import { WeaponBuild } from "../../eft/profile/IAkiProfile";
export interface IPresetBuildCallbacks {
    getHandbookUserlist(url: string, info: any, sessionID: string): IGetBodyResponseData<WeaponBuild[]>;
    saveBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    removeBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
}
