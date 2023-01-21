import { IPmcData } from "../common/IPmcData";
import { Message } from "../profile/IAkiProfile";
export interface IGetMailDialogViewResponseData {
    messages: Message[];
    profiles: IPmcData[];
    hasMessagesWithRewards: boolean;
}
