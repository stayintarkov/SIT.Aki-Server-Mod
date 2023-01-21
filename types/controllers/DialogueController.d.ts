import { DialogueHelper } from "../helpers/DialogueHelper";
import { IGetAllAttachmentsResponse } from "../models/eft/dialog/IGetAllAttachmentsResponse";
import { IGetFriendListDataResponse } from "../models/eft/dialog/IGetFriendListDataResponse";
import { IGetMailDialogViewResponseData } from "../models/eft/dialog/IGetMailDialogViewResponseData";
import { DialogueInfo, Message } from "../models/eft/profile/IAkiProfile";
import { SaveServer } from "../servers/SaveServer";
import { TimeUtil } from "../utils/TimeUtil";
export declare class DialogueController {
    protected saveServer: SaveServer;
    protected timeUtil: TimeUtil;
    protected dialogueHelper: DialogueHelper;
    constructor(saveServer: SaveServer, timeUtil: TimeUtil, dialogueHelper: DialogueHelper);
    update(): void;
    getFriendList(sessionID: string): IGetFriendListDataResponse;
    /**
     * Create array holding trader dialogs and mail interactions with player
     * Set the content of the dialogue on the list tab.
     * @param sessionID Session Id
     * @returns array of dialogs
     */
    generateDialogueList(sessionID: string): DialogueInfo[];
    /**
     * Get the content of a dialogue
     * @param dialogueID Dialog id
     * @param sessionID Session Id
     * @returns DialogueInfo
     */
    getDialogueInfo(dialogueID: string, sessionID: string): DialogueInfo;
    /**
     * Handle player clicking 'messenger' and seeing all the messages they've recieved
     * Set the content of the dialogue on the details panel, showing all the messages
     * for the specified dialogue.
     * @param dialogueID Dialog id
     * @param sessionID Session id
     * @returns IGetMailDialogViewResponseData object
     */
    generateDialogueView(dialogueID: string, sessionID: string): IGetMailDialogViewResponseData;
    /**
     * Get a count of messages with attachments from a particular dialog
     * @param sessionID Session id
     * @param dialogueID Dialog id
     * @returns Count of messages with attachments
     */
    protected getUnreadMessagesWithAttachmentsCount(sessionID: string, dialogueID: string): number;
    /**
     * Does array have messages with uncollected rewards (includes expired rewards)
     * @param messages Messages to check
     * @returns true if uncollected rewards found
     */
    protected messagesHaveUncollectedRewards(messages: Message[]): boolean;
    removeDialogue(dialogueID: string, sessionID: string): void;
    setDialoguePin(dialogueID: string, shouldPin: boolean, sessionID: string): void;
    setRead(dialogueIDs: string[], sessionID: string): void;
    /**
     * Get all uncollected items attached to mail in a particular dialog
     * @param dialogueID Dialog to get mail attachments from
     * @param sessionID Session id
     * @returns
     */
    getAllAttachments(dialogueID: string, sessionID: string): IGetAllAttachmentsResponse;
    /**
     * Get messages from a specific dialog that have items not expired
     * @param sessionId Session id
     * @param dialogueId Dialog to get mail attachments from
     * @returns Message array
     */
    protected getActiveMessagesFromDialog(sessionId: string, dialogueId: string): Message[];
    /**
     * Return array of messages with uncollected items (includes expired)
     * @param messages Messages to parse
     * @returns messages with items to collect
     */
    protected getMessagesWithAttachments(messages: Message[]): Message[];
    /**
     * Delete expired items. triggers when updating traders.
     * @param sessionID Session id
     */
    protected removeExpiredItems(sessionID: string): void;
}
