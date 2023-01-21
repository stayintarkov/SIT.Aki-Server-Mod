import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryBindRequestData extends IInventoryBaseActionRequestData {
    Action: "Bind";
    item: string;
    index: number;
}
