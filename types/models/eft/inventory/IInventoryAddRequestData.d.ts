import { Container, IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryAddRequestData extends IInventoryBaseActionRequestData {
    Action: "Add";
    item: string;
    container: Container;
}
