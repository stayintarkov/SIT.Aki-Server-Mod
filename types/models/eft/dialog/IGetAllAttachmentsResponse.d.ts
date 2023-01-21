import { Message } from "../profile/IAkiProfile";
export interface IGetAllAttachmentsResponse {
    messages: Message[];
    profiles: any[];
    hasMessagesWithRewards: boolean;
}
