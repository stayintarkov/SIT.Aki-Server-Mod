import { INotification } from "../models/eft/notifier/INotifier";
import { Dialogue, IUserDialogInfo } from "../models/eft/profile/IAkiProfile";
import { MessageType } from "../models/enums/MessageType";
import { SaveServer } from "../servers/SaveServer";
import { WebSocketServer } from "../servers/WebSocketServer";
import { NotificationService } from "../services/NotificationService";
import { HashUtil } from "../utils/HashUtil";
export declare class NotificationSendHelper {
    protected webSocketServer: WebSocketServer;
    protected hashUtil: HashUtil;
    protected saveServer: SaveServer;
    protected notificationService: NotificationService;
    constructor(webSocketServer: WebSocketServer, hashUtil: HashUtil, saveServer: SaveServer, notificationService: NotificationService);
    /**
     * Send notification message to the appropriate channel
     * @param sessionID
     * @param notificationMessage
     */
    sendMessage(sessionID: string, notificationMessage: INotification): void;
    /**
     * Send a message directly to the player
     * @param sessionId Session id
     * @param senderDetails Who is sendin the message to player
     * @param messageText Text to send player
     * @param messageType Underlying type of message being sent
     */
    sendMessageToPlayer(sessionId: string, senderDetails: IUserDialogInfo, messageText: string, messageType: MessageType): void;
    /**
     * Helper function for sendMessageToPlayer(), get new dialog for storage in profile or find existing by sender id
     * @param sessionId Session id
     * @param messageType Type of message to generate
     * @param senderDetails Who is sending the message
     * @returns Dialogue
     */
    protected getDialog(sessionId: string, messageType: MessageType, senderDetails: IUserDialogInfo): Dialogue;
}
