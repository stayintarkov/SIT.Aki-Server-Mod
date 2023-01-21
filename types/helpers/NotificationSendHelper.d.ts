import { INotification } from "../models/eft/notifier/INotifier";
import { WebSocketServer } from "../servers/WebSocketServer";
import { NotificationService } from "../services/NotificationService";
export declare class NotificationSendHelper {
    protected webSocketServer: WebSocketServer;
    protected notificationService: NotificationService;
    constructor(webSocketServer: WebSocketServer, notificationService: NotificationService);
    /**
     * Send notification message to the appropiate channel
     */
    sendMessage(sessionID: string, notificationMessage: INotification): void;
}
