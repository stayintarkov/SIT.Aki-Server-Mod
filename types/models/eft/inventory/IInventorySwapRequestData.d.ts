import { OwnerInfo } from "../common/request/IBaseInteractionRequestData";
import { IInventoryBaseActionRequestData, To } from "./IInventoryBaseActionRequestData";
export interface IInventorySwapRequestData extends IInventoryBaseActionRequestData {
    Action: "Swap";
    item: string;
    to: To;
    item2: string;
    to2: To;
    fromOwner2: OwnerInfo;
    toOwner2: OwnerInfo;
}
