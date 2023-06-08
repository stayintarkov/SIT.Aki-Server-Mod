import { Item, Location } from "../common/tables/IItem";
export interface IAddItemTempObject {
    itemRef: Item;
    count: number;
    isPreset: boolean;
    location?: Location;
}
