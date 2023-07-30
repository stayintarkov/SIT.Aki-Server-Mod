import { IPmcData } from "../models/eft/common/IPmcData";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { TimeUtil } from "../utils/TimeUtil";
import { LocalisationService } from "./LocalisationService";
export declare class PlayerService {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected localisationService: LocalisationService;
    protected databaseServer: DatabaseServer;
    constructor(logger: ILogger, timeUtil: TimeUtil, localisationService: LocalisationService, databaseServer: DatabaseServer);
    /**
     * Dupe of QuestHelper.rewardsSkillPoints()
     * Add xp to a player skill
     * @param pmcData Player profile
     * @param skillName Name of skill to increment
     * @param amount Amount of skill points to add to skill
     * @param useSkillProgressRateMultipler Skills are multiplied by a value in globals, default is off to maintain compatibility with legacy code
     */
    incrementSkillLevel(pmcData: IPmcData, skillName: string, amount: number, useSkillProgressRateMultipler?: boolean): void;
    /**
     * Get level of player
     * @param pmcData Player profile
     * @returns Level of player
     */
    calculateLevel(pmcData: IPmcData): number;
}
