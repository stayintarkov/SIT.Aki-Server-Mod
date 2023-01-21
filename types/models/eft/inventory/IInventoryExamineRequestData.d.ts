import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryExamineRequestData extends IInventoryBaseActionRequestData {
    Action: "Examine";
    item: string;
    fromOwner: IFromOwner;
}
export interface IFromOwner {
    id: string;
    type: string;
}
