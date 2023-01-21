import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryFoldRequestData extends IInventoryBaseActionRequestData {
    Action: "Fold";
    item: string;
    value: boolean;
}
