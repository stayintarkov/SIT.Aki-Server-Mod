import { Item } from "../../../models/eft/common/tables/IItem";
import { ISystemData, IUserDialogInfo, MessageContentRagfair } from "../../../models/eft/profile/IAkiProfile";
import { MessageType } from "../../../models/enums/MessageType";
import { Traders } from "../../../models/enums/Traders";
export interface ISendMessageDetails {
    /** Player id */
    recipientId: string;
    /** Who is sending this message */
    sender: MessageType;
    /** Optional - leave blank to use sender value */
    dialogType?: MessageType;
    /** Optional - if sender is USER these details are used */
    senderDetails?: IUserDialogInfo;
    /** Optional - the trader sending the message */
    trader?: Traders;
    /** Optional - used in player/system messages, otherwise templateId is used */
    messageText?: string;
    /** Optinal - Items to send to player */
    items?: Item[];
    /** Optional - How long items will be stored in mail before expiry */
    itemsMaxStorageLifetimeSeconds?: number;
    /** Optional - Used when sending messages from traders who send text from locale json */
    templateId?: string;
    /** Optional - ragfair related */
    systemData?: ISystemData;
    /** Optional - Used by ragfair messages */
    ragfairDetails?: MessageContentRagfair;
    /** Optional - Usage not known, unsure of purpose, even dumps dont have it */
    profileChangeEvents?: any[];
}
