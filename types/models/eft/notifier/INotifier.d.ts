export interface INotifierChannel {
    server: string;
    channel_id: string;
    url: string;
    notifierServer: string;
    ws: string;
}
import { Message } from "../profile/IAkiProfile";
export interface INotification {
    type: "RagfairOfferSold" | "new_message" | "ping";
    eventId: string;
    dialogId?: string;
    message?: Message;
}
