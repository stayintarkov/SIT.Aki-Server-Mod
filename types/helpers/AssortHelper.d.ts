import { IPmcData } from "../models/eft/common/IPmcData";
import { ITraderAssort } from "../models/eft/common/tables/ITrader";
import { QuestStatus } from "../models/enums/QuestStatus";
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
     * Remove assorts from a trader that have not been unlocked yet (via player completing corrisponding quest)
     * @param pmcProfile Player profile
     * @param traderId Traders id the assort belongs to
     * @param traderAssorts All assort items from same trader
     * @param mergedQuestAssorts Dict of quest assort to quest id unlocks for all traders (key = started/failed/complete)
     * @returns Assort items minus locked quest assorts
     */
    stripLockedQuestAssort(pmcProfile: IPmcData, traderId: string, traderAssorts: ITraderAssort, mergedQuestAssorts: Record<string, Record<string, string>>, flea?: boolean): ITraderAssort;
    /**
     * Get a quest id + the statuses quest can be in to unlock assort
     * @param mergedQuestAssorts quest assorts to search for assort id
     * @param assortId Assort to look for linked quest id
     * @returns quest id + array of quest status the assort should show for
     */
    protected getQuestIdAndStatusThatShowAssort(mergedQuestAssorts: Record<string, Record<string, string>>, assortId: string): {
        questId: string;
        status: QuestStatus[];
    };
    /**
     * Remove assorts from a trader that have not been unlocked yet
     * @param pmcProfile player profile
     * @param traderId traders id
     * @param assort traders assorts
     * @returns traders assorts minus locked loyalty assorts
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
