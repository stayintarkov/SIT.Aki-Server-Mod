import { Container, IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventorySplitRequestData extends IInventoryBaseActionRequestData {
    Action: "Split";
    item: string;
    container: Container;
    count: number;
}
