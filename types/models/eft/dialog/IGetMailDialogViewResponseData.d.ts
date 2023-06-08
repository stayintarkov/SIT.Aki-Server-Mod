import { Message } from "../profile/IAkiProfile";
export interface IGetMailDialogViewResponseData {
    messages: Message[];
    profiles: any[];
    hasMessagesWithRewards: boolean;
}
