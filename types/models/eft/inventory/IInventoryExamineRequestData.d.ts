import { OwnerInfo } from "../common/request/IBaseInteractionRequestData";
import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryExamineRequestData extends IInventoryBaseActionRequestData {
    Action: "Examine";
    item: string;
    fromOwner: OwnerInfo;
}
