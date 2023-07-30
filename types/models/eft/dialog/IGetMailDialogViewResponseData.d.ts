import { IUserDialogInfo, Message } from "../profile/IAkiProfile";
export interface IGetMailDialogViewResponseData {
    messages: Message[];
    profiles: IUserDialogInfo[];
    hasMessagesWithRewards: boolean;
}
