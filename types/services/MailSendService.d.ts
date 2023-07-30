import { ItemHelper } from "../helpers/ItemHelper";
import { NotificationSendHelper } from "../helpers/NotificationSendHelper";
import { NotifierHelper } from "../helpers/NotifierHelper";
import { Item } from "../models/eft/common/tables/IItem";
import { Dialogue, IUserDialogInfo, Message, MessageItems } from "../models/eft/profile/IAkiProfile";
import { MessageType } from "../models/enums/MessageType";
import { Traders } from "../models/enums/Traders";
import { ISendMessageDetails } from "../models/spt/dialog/ISendMessageDetails";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { HashUtil } from "../utils/HashUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { LocalisationService } from "./LocalisationService";
export declare class MailSendService {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseServer: DatabaseServer;
    protected notifierHelper: NotifierHelper;
    protected notificationSendHelper: NotificationSendHelper;
    protected localisationService: LocalisationService;
    protected itemHelper: ItemHelper;
    protected readonly systemSenderId = "59e7125688a45068a6249071";
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, saveServer: SaveServer, databaseServer: DatabaseServer, notifierHelper: NotifierHelper, notificationSendHelper: NotificationSendHelper, localisationService: LocalisationService, itemHelper: ItemHelper);
    /**
     * Send a message from an NPC (e.g. prapor) to the player with or without items using direct message text, do not look up any locale
     * @param playerId Players id to send message to
     * @param sender The trader sending the message
     * @param messageType What type the message will assume (e.g. QUEST_SUCCESS)
     * @param message Text to send to the player
     * @param items Optional items to send to player
     * @param maxStorageTimeSeconds Optional time to collect items before they expire
     */
    sendDirectNpcMessageToPlayer(playerId: string, sender: Traders, messageType: MessageType, message: string, items?: Item[], maxStorageTimeSeconds?: any): void;
    /**
     * Send a message from an NPC (e.g. prapor) to the player with or without items
     * @param playerId Players id to send message to
     * @param sender The trader sending the message
     * @param messageType What type the message will assume (e.g. QUEST_SUCCESS)
     * @param messageLocaleId The localised text to send to player
     * @param items Optional items to send to player
     * @param maxStorageTimeSeconds Optional time to collect items before they expire
     */
    sendLocalisedNpcMessageToPlayer(playerId: string, sender: Traders, messageType: MessageType, messageLocaleId: string, items?: Item[], maxStorageTimeSeconds?: any): void;
    /**
     * Send a message from SYSTEM to the player with or without items
     * @param playerId Players id to send message to
     * @param message The text to send to player
     * @param items Optional items to send to player
     * @param maxStorageTimeSeconds Optional time to collect items before they expire
     */
    sendSystemMessageToPlayer(playerId: string, message: string, items?: Item[], maxStorageTimeSeconds?: any): void;
    /**
     * Send a USER message to a player with or without items
     * @param playerId Players id to send message to
     * @param senderId Who is sending the message
     * @param message The text to send to player
     * @param items Optional items to send to player
     * @param maxStorageTimeSeconds Optional time to collect items before they expire
     */
    sendUserMessageToPlayer(playerId: string, senderDetails: IUserDialogInfo, message: string, items?: Item[], maxStorageTimeSeconds?: any): void;
    /**
     * Large function to send messages to players from a variety of sources (SYSTEM/NPC/USER)
     * Helper functions in this class are availble to simplify common actions
     * @param messageDetails Details needed to send a message to the player
     */
    sendMessageToPlayer(messageDetails: ISendMessageDetails): void;
    /**
     * Send a message from the player to an NPC
     * @param sessionId Player id
     * @param targetNpcId NPC message is sent to
     * @param message Text to send to NPC
     */
    sendPlayerMessageToNpc(sessionId: string, targetNpcId: string, message: string): void;
    /**
     * Create a message for storage inside a dialog in the player profile
     * @param senderDialog Id of dialog that will hold the message
     * @param messageDetails Various details on what the message must contain/do
     * @returns Message
     */
    protected createDialogMessage(dialogId: string, messageDetails: ISendMessageDetails): Message;
    /**
     * Add items to message and adjust various properties to reflect the items being added
     * @param message Message to add items to
     * @param itemsToSendToPlayer Items to add to message
     * @param maxStorageTimeSeconds total time items are stored in mail before being deleted
     */
    protected addRewardItemsToMessage(message: Message, itemsToSendToPlayer: MessageItems, maxStorageTimeSeconds: number): void;
    /**
     * perform various sanitising actions on the items before they're considered ready for insertion into message
     * @param dialogType The type of the dialog that will hold the reward items being processed
     * @param messageDetails
     * @returns Sanitised items
     */
    protected processItemsBeforeAddingToMail(dialogType: MessageType, messageDetails: ISendMessageDetails): MessageItems;
    /**
     * Get a dialog with a specified entity (user/trader)
     * Create and store empty dialog if none exists in profile
     * @param messageDetails Data on what message should do
     * @returns Relevant Dialogue
     */
    protected getDialog(messageDetails: ISendMessageDetails): Dialogue;
    /**
     * Get the appropriate sender id by the sender enum type
     * @param messageDetails
     * @returns gets an id of the individual sending it
     */
    protected getMessageSenderIdByType(messageDetails: ISendMessageDetails): string;
}
