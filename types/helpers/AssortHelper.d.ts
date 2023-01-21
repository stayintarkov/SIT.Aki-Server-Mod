import { IPmcData } from "../models/eft/common/IPmcData";
import { ITraderAssort } from "../models/eft/common/tables/ITrader";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocalisationService } from "../services/LocalisationService";
import { ItemHelper } from "./ItemHelper";
import { QuestHelper } from "./QuestHelper";
export declare class AssortHelper {
    protected logger: ILogger;
    protected itemHelper: ItemHelper;
    protected databaseServer: DatabaseServer;
    protected localisationService: LocalisationService;
    protected questHelper: QuestHelper;
    constructor(logger: ILogger, itemHelper: ItemHelper, databaseServer: DatabaseServer, localisationService: LocalisationService, questHelper: QuestHelper);
    /**
     * Remove assorts from a trader that have not been unlocked yet
     * @param pmcProfile player profile
     * @param traderId traders id
     * @param assort assort items from a trader
     * @returns assort items minus locked quest assorts
     */
    stripLockedQuestAssort(pmcProfile: IPmcData, traderId: string, assort: ITraderAssort, flea?: boolean): ITraderAssort;
    /**
     * Remove assorts from a trader that have not been unlocked yet
     * @param pmcProfile player profile
     * @param traderId traders id
     * @param assort traders assorts
     * @returns traders assorts minus locked loyality assorts
     */
    stripLockedLoyaltyAssort(pmcProfile: IPmcData, traderId: string, assort: ITraderAssort): ITraderAssort;
    /**
     * Remove an item from an assort
     * @param assort assort to modify
     * @param itemID item id to remove from asort
     * @returns Modified assort
     */
    removeItemFromAssort(assort: ITraderAssort, itemID: string, flea?: boolean): ITraderAssort;
}
