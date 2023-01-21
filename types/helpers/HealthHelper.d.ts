import { IPmcData } from "../models/eft/common/IPmcData";
import { Effect } from "../models/eft/health/Effect";
import { ISyncHealthRequestData } from "../models/eft/health/ISyncHealthRequestData";
import { IAkiProfile } from "../models/eft/profile/IAkiProfile";
import { IHealthConfig } from "../models/spt/config/IHealthConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { SaveServer } from "../servers/SaveServer";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class HealthHelper {
    protected jsonUtil: JsonUtil;
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected configServer: ConfigServer;
    protected healthConfig: IHealthConfig;
    constructor(jsonUtil: JsonUtil, logger: ILogger, timeUtil: TimeUtil, saveServer: SaveServer, configServer: ConfigServer);
    /**
     * Resets the profiles vitality/healh and vitality/effects properties to their defaults
     * @param sessionID Session Id
     * @returns updated profile
     */
    resetVitality(sessionID: string): IAkiProfile;
    /**
     * Update player profile with changes from request object
     * @param pmcData Player profile
     * @param info Request object
     * @param sessionID Session id
     * @param addEffects Should effects be added or removed (default - add)
     */
    saveVitality(pmcData: IPmcData, info: ISyncHealthRequestData, sessionID: string, addEffects?: boolean, deleteExistingEffects?: boolean): void;
    protected saveHealth(pmcData: IPmcData, sessionID: string): void;
    /**
     * Save effects to profile
     * Works by removing all effects and adding them back from profile
     * Remoces empty 'Effects' objects if found
     * @param pmcData Player profile
     * @param sessionID Session id
     * @param addEffects Should effects be added back to profile
     * @returns
     */
    protected saveEffects(pmcData: IPmcData, sessionID: string, addEffects: boolean, deleteExistingEffects?: boolean): void;
    /**
     * Add effect to body part in profile
     * @param pmcData Player profile
     * @param effectBodyPart body part to edit
     * @param effectType Effect to add to body part
     */
    protected addEffect(pmcData: IPmcData, effectBodyPart: string, effectType: Effect): void;
    protected isEmpty(map: any): boolean;
}
