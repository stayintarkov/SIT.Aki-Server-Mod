import { NotifierHelper } from "../helpers/NotifierHelper";
import { NotificationService } from "../services/NotificationService";
import { INotifierChannel } from "../models/eft/notifier/INotifier";
import { HttpServerHelper } from "../helpers/HttpServerHelper";
export declare class NotifierController {
    protected notifierHelper: NotifierHelper;
    protected httpServerHelper: HttpServerHelper;
    protected notificationService: NotificationService;
    protected pollInterval: number;
    protected timeout: number;
    constructor(notifierHelper: NotifierHelper, httpServerHelper: HttpServerHelper, notificationService: NotificationService);
    /**
     * Resolve an array of session notifications.
     *
     * If no notifications are currently queued then intermittently check for new notifications until either
     * one or more appear or when a timeout expires.
     * If no notifications are available after the timeout, use a default message.
     */
    notifyAsync(sessionID: string): Promise<unknown>;
    getServer(sessionID: string): string;
    getChannel(sessionID: string): INotifierChannel;
}
