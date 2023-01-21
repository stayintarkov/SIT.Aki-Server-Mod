import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryCreateMarkerRequestData extends IInventoryBaseActionRequestData {
    Action: "CreateMapMarker";
    item: string;
    mapMarker: MapMarker;
}
export interface MapMarker {
    Type: string;
    X: number;
    Y: number;
    Note: string;
}
