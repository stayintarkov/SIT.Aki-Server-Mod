import { MessageType } from "../../enums/MessageType";
export interface IGetMailDialogViewRequestData {
    type: MessageType;
    dialogId: string;
    limit: number;
    time: number;
}
