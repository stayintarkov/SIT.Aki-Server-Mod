import { ItemHelper } from "../helpers/ItemHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IPresetBuildActionRequestData } from "../models/eft/presetBuild/IPresetBuildActionRequestData";
import { WeaponBuild } from "../models/eft/profile/IAkiProfile";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { SaveServer } from "../servers/SaveServer";
import { HashUtil } from "../utils/HashUtil";
export declare class PresetBuildController {
    protected hashUtil: HashUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected itemHelper: ItemHelper;
    protected saveServer: SaveServer;
    constructor(hashUtil: HashUtil, eventOutputHolder: EventOutputHolder, itemHelper: ItemHelper, saveServer: SaveServer);
    getUserBuilds(sessionID: string): WeaponBuild[];
    saveBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
    removeBuild(pmcData: IPmcData, body: IPresetBuildActionRequestData, sessionID: string): IItemEventRouterResponse;
}
