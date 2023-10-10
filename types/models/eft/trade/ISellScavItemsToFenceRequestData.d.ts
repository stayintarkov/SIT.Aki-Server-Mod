import { OwnerInfo } from "../common/request/IBaseInteractionRequestData";
export interface ISellScavItemsToFenceRequestData {
    Action: "SellAllFromSavage";
    fromOwner: OwnerInfo;
    toOwner: OwnerInfo;
}
