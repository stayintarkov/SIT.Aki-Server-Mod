import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryTransferRequestData extends IInventoryBaseActionRequestData {
    Action: "Transfer";
    item: string;
    with: string;
    count: number;
}
