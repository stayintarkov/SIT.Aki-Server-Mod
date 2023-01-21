import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryDeleteMarkerRequestData extends IInventoryBaseActionRequestData {
    Action: "DeleteMapMarker";
    item: string;
    X: number;
    Y: number;
}
