import { Item } from "../models/eft/common/tables/IItem";
import { Dialogue, MessageContent, MessagePreview } from "../models/eft/profile/IAkiProfile";
import { MessageType } from "../models/enums/MessageType";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { LocalisationService } from "../services/LocalisationService";
import { HashUtil } from "../utils/HashUtil";
import { ItemHelper } from "./ItemHelper";
import { NotificationSendHelper } from "./NotificationSendHelper";
import { NotifierHelper } from "./NotifierHelper";
export declare class DialogueHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected saveServer: SaveServer;
    protected databaseServer: DatabaseServer;
    protected notifierHelper: NotifierHelper;
    protected notificationSendHelper: NotificationSendHelper;
    protected localisationService: LocalisationService;
    protected itemHelper: ItemHelper;
    constructor(logger: ILogger, hashUtil: HashUtil, saveServer: SaveServer, databaseServer: DatabaseServer, notifierHelper: NotifierHelper, notificationSendHelper: NotificationSendHelper, localisationService: LocalisationService, itemHelper: ItemHelper);
    createMessageContext(templateId: string, messageType: MessageType, maxStoreTime: number): MessageContent;
    /**
     * Add a templated message to the dialogue.
     * @param dialogueID
     * @param messageContent
     * @param sessionID
     * @param rewards
     */
    addDialogueMessage(dialogueID: string, messageContent: MessageContent, sessionID: string, rewards?: Item[]): void;
    /**
     * Get the preview contents of the last message in a dialogue.
     * @param dialogue
     * @returns
     */
    getMessagePreview(dialogue: Dialogue): MessagePreview;
    /**
     * Get the item contents for a particular message.
     * @param messageID
     * @param sessionID
     * @param itemId Item being moved to inventory
     * @returns
     */
    getMessageItemContents(messageID: string, sessionID: string, itemId: string): Item[];
}
