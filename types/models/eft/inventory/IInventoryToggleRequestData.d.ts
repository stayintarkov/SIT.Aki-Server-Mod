import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryToggleRequestData extends IInventoryBaseActionRequestData {
    Action: "Toggle";
    item: string;
    value: boolean;
}
