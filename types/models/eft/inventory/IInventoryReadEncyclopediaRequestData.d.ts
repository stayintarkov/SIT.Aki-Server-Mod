import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IInventoryReadEncyclopediaRequestData extends IInventoryBaseActionRequestData {
    Action: "ReadEncyclopedia";
    ids: string[];
}
