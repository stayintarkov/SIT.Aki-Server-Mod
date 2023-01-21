import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryTagRequestData extends IInventoryBaseActionRequestData {
    Action: "Tag";
    item: string;
    TagName: string;
    TagColor: number;
}
