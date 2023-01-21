import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryMergeRequestData extends IInventoryBaseActionRequestData {
    Action: "Merge";
    item: string;
    with: string;
}
