import { INotification } from "../models/eft/notifier/INotifier";
import { Message, MessageContentRagfair } from "../models/eft/profile/IAkiProfile";
import { HttpServerHelper } from "./HttpServerHelper";
export declare class NotifierHelper {
    protected httpServerHelper: HttpServerHelper;
    /**
     * The default notification sent when waiting times out.
     */
    protected defaultNotification: INotification;
    constructor(httpServerHelper: HttpServerHelper);
    getDefaultNotification(): INotification;
    /** Creates a new notification that displays the "Your offer was sold!" prompt and removes sold offer from "My Offers" on clientside */
    createRagfairOfferSoldNotification(dialogueMessage: Message, ragfairData: MessageContentRagfair): INotification;
    /** Creates a new notification with the specified dialogueMessage object. */
    createNewMessageNotification(dialogueMessage: Message): INotification;
    getWebSocketServer(sessionID: string): string;
}
