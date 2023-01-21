import { IPmcData } from "../models/eft/common/IPmcData";
import { AvailableForConditions, AvailableForProps, IQuest, Reward } from "../models/eft/common/tables/IQuest";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IAcceptQuestRequestData } from "../models/eft/quests/IAcceptQuestRequestData";
import { ICompleteQuestRequestData } from "../models/eft/quests/ICompleteQuestRequestData";
import { QuestStatus } from "../models/enums/QuestStatus";
import { IQuestConfig } from "../models/spt/config/IQuestConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocaleService } from "../services/LocaleService";
import { LocalisationService } from "../services/LocalisationService";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { DialogueHelper } from "./DialogueHelper";
import { ItemHelper } from "./ItemHelper";
import { PaymentHelper } from "./PaymentHelper";
import { ProfileHelper } from "./ProfileHelper";
import { RagfairServerHelper } from "./RagfairServerHelper";
import { TraderHelper } from "./TraderHelper";
export declare class QuestHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseServer: DatabaseServer;
    protected localeService: LocaleService;
    protected ragfairServerHelper: RagfairServerHelper;
    protected dialogueHelper: DialogueHelper;
    protected profileHelper: ProfileHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected traderHelper: TraderHelper;
    protected configServer: ConfigServer;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, timeUtil: TimeUtil, hashUtil: HashUtil, itemHelper: ItemHelper, eventOutputHolder: EventOutputHolder, databaseServer: DatabaseServer, localeService: LocaleService, ragfairServerHelper: RagfairServerHelper, dialogueHelper: DialogueHelper, profileHelper: ProfileHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, traderHelper: TraderHelper, configServer: ConfigServer);
    /**
    * Get status of a quest by quest id
    * @param pmcData Profile to search
    * @param questID Quest id to look up
    * @returns QuestStauts enum
    */
    getQuestStatus(pmcData: IPmcData, questID: string): QuestStatus;
    /**
     * returns true is the level condition is satisfied
     * @param playerLevel Players level
     * @param condition Quest condition
     * @returns true if player level is greater than or equal to quest
     */
    doesPlayerLevelFulfilCondition(playerLevel: number, condition: AvailableForConditions): boolean;
    /**
     * Get the quests found in both arrays (inner join)
     * @param before Array of qeusts #1
     * @param after Array of quests #2
     * @returns Reduction of cartesian product between two quest arrays
     */
    getDeltaQuests(before: IQuest[], after: IQuest[]): IQuest[];
    /**
     * Increase skill points of a skill on player profile
     * @param sessionID Session id
     * @param pmcData Player profile
     * @param output output object to send back to client
     * @param skillName Name of skill to increase skill points of
     * @param progressAmount Amount of skill points to add to skill
     */
    rewardSkillPoints(sessionID: string, pmcData: IPmcData, output: IItemEventRouterResponse, skillName: string, progressAmount: number): void;
    /**
     * Get quest name by quest id
     * @param questId id to get
     * @returns
     */
    getQuestNameFromLocale(questId: string): string;
    /**
     * Check if trader has sufficient loyalty to fullfill quest requirement
     * @param questProperties Quest props
     * @param profile Player profile
     * @returns true if loyalty is high enough to fulfil quest requirement
     */
    traderStandingRequirementCheck(questProperties: AvailableForProps, profile: IPmcData): boolean;
    protected processReward(reward: Reward): Reward[];
    /**
     * Gets a flat list of reward items for the given quest at a specific state (e.g. Fail/Success)
     * @param quest quest to get rewards for
     * @param state Quest status that holds the items (Started, Success, Fail)
     * @returns array of items with the correct maxStack
     */
    getQuestRewardItems(quest: IQuest, state: QuestStatus): Reward[];
    /**
     * Update player profile with quest status (e.g. Fail/Success)
     * @param pmcData profile to add quest to
     * @param newState state the new quest should be in when added
     * @param acceptedQuest Details of quest being added
     */
    addQuestToPMCData(pmcData: IPmcData, newState: QuestStatus, acceptedQuest: IAcceptQuestRequestData): void;
    /**
     * TODO: what is going on here
     * @param acceptedQuestId Quest to add to profile
     * @param sessionID Session id
     * @returns Array of quests in profile + quest passed in as param
     */
    acceptedUnlocked(acceptedQuestId: string, sessionID: string): IQuest[];
    /**
     * TODO: what is going on here
     * @param failedQuestId
     * @param sessionID Session id
     * @returns
     */
    failedUnlocked(failedQuestId: string, sessionID: string): IQuest[];
    /**
     * Adjust quest money rewards by passed in multipler
     * @param quest Quest to multiple money rewards
     * @param multipler Value to adjust money rewards by
     * @returns Updated quest
     */
    applyMoneyBoost(quest: IQuest, multipler: number): IQuest;
    /**
     * Sets the item stack to new value, or delete the item if value <= 0
     * // TODO maybe merge this function and the one from customization
     * @param pmcData Profile
     * @param itemId id of item to adjust stack size of
     * @param newStackSize Stack size to adjust to
     * @param sessionID Session id
     * @param output ItemEvent router response
     */
    changeItemStack(pmcData: IPmcData, itemId: string, newStackSize: number, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Get List of All Quests from db
     * NOT CLONED
     * @returns Array of IQuest objects
     */
    getQuestsFromDb(): IQuest[];
    /**
     * Get quests, strip all requirement conditions except level
     * @param quests quests to process
     * @returns quest array without conditions
     */
    protected getQuestsWithOnlyLevelRequirementStartCondition(quests: IQuest[]): IQuest[];
    /**
     * Remove all quest conditions except for level requirement
     * @param quest quest to clean
     * @returns reset IQuest object
     */
    getQuestWithOnlyLevelRequirementStartCondition(quest: IQuest): IQuest;
    /**
     * Fail a quest in a player profile
     * @param pmcData Profile
     * @param failRequest fail quest request data
     * @param sessionID Session id
     * @returns Item event router response
     */
    failQuest(pmcData: IPmcData, failRequest: any, sessionID: string): IItemEventRouterResponse;
    /**
     * Get quest by id from database
     * @param questId questid to look for
     * @param pmcData player profile
     * @returns IQuest object
     */
    getQuestFromDb(questId: string, pmcData: IPmcData): IQuest;
    /**
     * Get the locale Id from locale db for a quest message
     * @param questMessageId Quest mesage id to look up
     * @returns Locale Id from locale db
     */
    getQuestLocaleIdFromDb(questMessageId: string): string;
    /**
     * Alter a quests state + Add a record to tis status timers object
     * @param pmcData Profile to update
     * @param newQuestState new state the qeust should be in
     * @param questId id of the quest to alter the status of
     */
    updateQuestState(pmcData: IPmcData, newQuestState: QuestStatus, questId: string): void;
    /**
     * Give player quest rewards - Skills/exp/trader standing/items/assort unlocks
     * @param pmcData Player profile
     * @param body complete quest request
     * @param state State of the quest now its complete
     * @param sessionID Seession id
     * @returns array of reward objects
     */
    applyQuestReward(pmcData: IPmcData, body: ICompleteQuestRequestData, state: QuestStatus, sessionID: string): Reward[];
    /**
     * Get the intel center bonus a player has
     * @param pmcData player profile
     * @returns bonus in percent
     */
    protected getIntelCenterRewardBonus(pmcData: IPmcData): number;
    /**
     * Find quest with 'findItem' requirement that needs the item tpl be handed in
     * @param itemTpl item tpl to look for
     * @returns 'FindItem' condition id
     */
    getFindItemIdForQuestHandIn(itemTpl: string): string;
}
