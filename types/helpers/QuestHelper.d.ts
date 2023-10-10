import { IPmcData } from "../models/eft/common/IPmcData";
import { IQuestStatus } from "../models/eft/common/tables/IBotBase";
import { Item } from "../models/eft/common/tables/IItem";
import { AvailableForConditions, AvailableForProps, IQuest, Reward } from "../models/eft/common/tables/IQuest";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IAcceptQuestRequestData } from "../models/eft/quests/IAcceptQuestRequestData";
import { IFailQuestRequestData } from "../models/eft/quests/IFailQuestRequestData";
import { QuestStatus } from "../models/enums/QuestStatus";
import { IQuestConfig } from "../models/spt/config/IQuestConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocaleService } from "../services/LocaleService";
import { LocalisationService } from "../services/LocalisationService";
import { MailSendService } from "../services/MailSendService";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { DialogueHelper } from "./DialogueHelper";
import { ItemHelper } from "./ItemHelper";
import { PaymentHelper } from "./PaymentHelper";
import { ProfileHelper } from "./ProfileHelper";
import { QuestConditionHelper } from "./QuestConditionHelper";
import { RagfairServerHelper } from "./RagfairServerHelper";
import { TraderHelper } from "./TraderHelper";
export declare class QuestHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected questConditionHelper: QuestConditionHelper;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseServer: DatabaseServer;
    protected localeService: LocaleService;
    protected ragfairServerHelper: RagfairServerHelper;
    protected dialogueHelper: DialogueHelper;
    protected profileHelper: ProfileHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected traderHelper: TraderHelper;
    protected mailSendService: MailSendService;
    protected configServer: ConfigServer;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, timeUtil: TimeUtil, hashUtil: HashUtil, itemHelper: ItemHelper, questConditionHelper: QuestConditionHelper, eventOutputHolder: EventOutputHolder, databaseServer: DatabaseServer, localeService: LocaleService, ragfairServerHelper: RagfairServerHelper, dialogueHelper: DialogueHelper, profileHelper: ProfileHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, traderHelper: TraderHelper, mailSendService: MailSendService, configServer: ConfigServer);
    /**
    * Get status of a quest in player profile by its id
    * @param pmcData Profile to search
    * @param questId Quest id to look up
    * @returns QuestStatus enum
    */
    getQuestStatus(pmcData: IPmcData, questId: string): QuestStatus;
    /**
     * returns true is the level condition is satisfied
     * @param playerLevel Players level
     * @param condition Quest condition
     * @returns true if player level is greater than or equal to quest
     */
    doesPlayerLevelFulfilCondition(playerLevel: number, condition: AvailableForConditions): boolean;
    /**
     * Get the quests found in both arrays (inner join)
     * @param before Array of quests #1
     * @param after Array of quests #2
     * @returns Reduction of cartesian product between two quest arrays
     */
    getDeltaQuests(before: IQuest[], after: IQuest[]): IQuest[];
    /**
     * Increase skill points of a skill on player profile
     * Dupe of PlayerService.incrementSkillLevel()
     * @param sessionID Session id
     * @param pmcData Player profile
     * @param skillName Name of skill to increase skill points of
     * @param progressAmount Amount of skill points to add to skill
     */
    rewardSkillPoints(sessionID: string, pmcData: IPmcData, skillName: string, progressAmount: number): void;
    /**
     * Get quest name by quest id
     * @param questId id to get
     * @returns
     */
    getQuestNameFromLocale(questId: string): string;
    /**
     * Check if trader has sufficient loyalty to fulfill quest requirement
     * @param questProperties Quest props
     * @param profile Player profile
     * @returns true if loyalty is high enough to fulfill quest requirement
     */
    traderLoyaltyLevelRequirementCheck(questProperties: AvailableForProps, profile: IPmcData): boolean;
    /**
     * Check if trader has sufficient standing to fulfill quest requirement
     * @param questProperties Quest props
     * @param profile Player profile
     * @returns true if standing is high enough to fulfill quest requirement
     */
    traderStandingRequirementCheck(questProperties: AvailableForProps, profile: IPmcData): boolean;
    protected compareAvailableForValues(current: number, required: number, compareMethod: string): boolean;
    /**
     * take reward item from quest and set FiR status + fix stack sizes + fix mod Ids
     * @param reward Reward item to fix
     * @returns Fixed rewards
     */
    protected processReward(reward: Reward): Reward[];
    /**
     * Gets a flat list of reward items for the given quest at a specific state (e.g. Fail/Success)
     * @param quest quest to get rewards for
     * @param status Quest status that holds the items (Started, Success, Fail)
     * @returns array of items with the correct maxStack
     */
    getQuestRewardItems(quest: IQuest, status: QuestStatus): Reward[];
    /**
     * Look up quest in db by accepted quest id and construct a profile-ready object ready to store in profile
     * @param pmcData Player profile
     * @param newState State the new quest should be in when returned
     * @param acceptedQuest Details of accepted quest from client
     */
    getQuestReadyForProfile(pmcData: IPmcData, newState: QuestStatus, acceptedQuest: IAcceptQuestRequestData): IQuestStatus;
    /**
     * Get quests that can be shown to player after starting a quest
     * @param startedQuestId Quest started by player
     * @param sessionID Session id
     * @returns Quests accessible to player incuding newly unlocked quests now quest (startedQuestId) was started
     */
    getNewlyAccessibleQuestsWhenStartingQuest(startedQuestId: string, sessionID: string): IQuest[];
    /**
     * Get quests that can be shown to player after failing a quest
     * @param failedQuestId Id of the quest failed by player
     * @param sessionId Session id
     * @returns IQuest array
     */
    failedUnlocked(failedQuestId: string, sessionId: string): IQuest[];
    /**
     * Adjust quest money rewards by passed in multiplier
     * @param quest Quest to multiple money rewards
     * @param multiplier Value to adjust money rewards by
     * @param questStatus Status of quest to apply money boost to rewards of
     * @returns Updated quest
     */
    applyMoneyBoost(quest: IQuest, multiplier: number, questStatus: QuestStatus): IQuest;
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
     * Add item stack change object into output route event response
     * @param output Response to add item change event into
     * @param sessionId Session id
     * @param item Item that was adjusted
     */
    protected addItemStackSizeChangeIntoEventResponse(output: IItemEventRouterResponse, sessionId: string, item: Item): void;
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
     * @param pmcData Player profile
     * @param failRequest Fail quest request data
     * @param sessionID Session id
     * @param output Client output
     * @returns Item event router response
     */
    failQuest(pmcData: IPmcData, failRequest: IFailQuestRequestData, sessionID: string, output?: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Get List of All Quests from db
     * NOT CLONED
     * @returns Array of IQuest objects
     */
    getQuestsFromDb(): IQuest[];
    /**
     * Get quest by id from database (repeatables are stored in profile, check there if questId not found)
     * @param questId Id of quest to find
     * @param pmcData Player profile
     * @returns IQuest object
     */
    getQuestFromDb(questId: string, pmcData: IPmcData): IQuest;
    /**
     * Get a quests startedMessageText key from db, if no startedMessageText key found, use description key instead
     * @param startedMessageTextId startedMessageText property from IQuest
     * @param questDescriptionId description property from IQuest
     * @returns message id
     */
    getMessageIdForQuestStart(startedMessageTextId: string, questDescriptionId: string): string;
    /**
     * Get the locale Id from locale db for a quest message
     * @param questMessageId Quest message id to look up
     * @returns Locale Id from locale db
     */
    getQuestLocaleIdFromDb(questMessageId: string): string;
    /**
     * Alter a quests state + Add a record to its status timers object
     * @param pmcData Profile to update
     * @param newQuestState New state the quest should be in
     * @param questId Id of the quest to alter the status of
     */
    updateQuestState(pmcData: IPmcData, newQuestState: QuestStatus, questId: string): void;
    /**
     * Give player quest rewards - Skills/exp/trader standing/items/assort unlocks - Returns reward items player earned
     * @param pmcData Player profile
     * @param questId questId of quest to get rewards for
     * @param state State of the quest to get rewards for
     * @param sessionId Session id
     * @param questResponse Response to send back to client
     * @returns Array of reward objects
     */
    applyQuestReward(pmcData: IPmcData, questId: string, state: QuestStatus, sessionId: string, questResponse: IItemEventRouterResponse): Reward[];
    /**
     * WIP - Find hideout craft id and add to unlockedProductionRecipe array in player profile
     * also update client response recipeUnlocked array with craft id
     * @param pmcData Player profile
     * @param craftUnlockReward Reward item from quest with craft unlock details
     * @param questDetails Quest with craft unlock reward
     * @param sessionID Session id
     * @param response Response to send back to client
     */
    protected findAndAddHideoutProductionIdToProfile(pmcData: IPmcData, craftUnlockReward: Reward, questDetails: IQuest, sessionID: string, response: IItemEventRouterResponse): void;
    /**
     * Get players money reward bonus from profile
     * @param pmcData player profile
     * @returns bonus as a percent
     */
    protected getQuestMoneyRewardBonus(pmcData: IPmcData): number;
    /**
     * Find quest with 'findItem' condition that needs the item tpl be handed in
     * @param itemTpl item tpl to look for
     * @param questIds Quests to search through for the findItem condition
     * @returns quest id with 'FindItem' condition id
     */
    getFindItemConditionByQuestItem(itemTpl: string, questIds: string[], allQuests: IQuest[]): Record<string, string>;
    /**
     * Add all quests to a profile with the provided statuses
     * @param pmcProfile profile to update
     * @param statuses statuses quests should have
     */
    addAllQuestsToProfile(pmcProfile: IPmcData, statuses: QuestStatus[]): void;
}
