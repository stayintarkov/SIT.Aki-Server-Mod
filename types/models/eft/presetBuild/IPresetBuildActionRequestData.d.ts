import { Item } from "../common/tables/IItem";
export interface IPresetBuildActionRequestData {
    Action: string;
    id: string;
    name: string;
    root: string;
    items: Item[];
}
