import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryRemoveRequestData extends IInventoryBaseActionRequestData {
    Action: "Remove";
    item: string;
}
