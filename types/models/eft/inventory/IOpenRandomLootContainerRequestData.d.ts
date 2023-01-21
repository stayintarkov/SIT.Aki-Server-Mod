import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IOpenRandomLootContainerRequestData extends IInventoryBaseActionRequestData {
    Action: "OpenRandomLootContainer";
    /** Container item opened */
    item: string;
    to: To[];
}
export interface To {
    /** Player character (pmc/scav) id items will be sent to */
    id: string;
}
