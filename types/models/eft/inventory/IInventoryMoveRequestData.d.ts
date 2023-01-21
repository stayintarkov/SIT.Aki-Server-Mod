import { IInventoryBaseActionRequestData, To } from "./IInventoryBaseActionRequestData";
export interface IInventoryMoveRequestData extends IInventoryBaseActionRequestData {
    Action: "Move";
    item: string;
    to: To;
}
