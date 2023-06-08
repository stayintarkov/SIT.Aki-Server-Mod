import { IPmcData } from "../models/eft/common/IPmcData";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocalisationService } from "./LocalisationService";
export declare class PlayerService {
    protected logger: ILogger;
    protected localisationService: LocalisationService;
    protected databaseServer: DatabaseServer;
    constructor(logger: ILogger, localisationService: LocalisationService, databaseServer: DatabaseServer);
    /**
     * increases the profile skill and updates any output
     * @param {Object} pmcData
     * @param {String} skillName
     * @param {Number} amount
     */
    incrementSkillLevel(pmcData: IPmcData, skillName: string, amount: number): void;
    /**
     * @param {Object} pmcData
     * @returns number
     */
    calculateLevel(pmcData: IPmcData): number;
}
