import { ProfileHelper } from "../helpers/ProfileHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IHideoutImprovement, Productive } from "../models/eft/common/tables/IBotBase";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class EventOutputHolder {
    protected jsonUtil: JsonUtil;
    protected profileHelper: ProfileHelper;
    protected timeUtil: TimeUtil;
    /** What has client been informed of this game session */
    protected clientActiveSessionStorage: Record<string, {
        clientInformed: boolean;
    }>;
    constructor(jsonUtil: JsonUtil, profileHelper: ProfileHelper, timeUtil: TimeUtil);
    protected output: IItemEventRouterResponse;
    getOutput(sessionID: string): IItemEventRouterResponse;
    /**
     * Reset the response object to a default state
     * Occurs prior to event being handled by server
     * @param sessionID Players id
     */
    resetOutput(sessionID: string): void;
    /**
     * Update output object with most recent values from player profile
     * @param sessionId Session id
     */
    updateOutputProperties(sessionId: string): void;
    /**
     * Return all hideout Improvements from player profile, adjust completed Improvements' completed property to be true
     * @param pmcData Player profile
     * @returns dictionary of hideout improvements
     */
    protected getImprovementsFromProfileAndFlagComplete(pmcData: IPmcData): Record<string, IHideoutImprovement>;
    /**
     * Return  productions from player profile except those completed crafts the client has already seen
     * @param pmcData Player profile
     * @returns dictionary of hideout productions
     */
    protected getProductionsFromProfileAndFlagComplete(productions: Record<string, Productive>): Record<string, Productive>;
}
