import { Upd } from "../common/tables/IItem";
export interface IPresetBuildActionRequestData {
    Action: string;
    id: string;
    name: string;
    root: string;
    items: Item[];
}
export interface Item {
    _id: string;
    _tpl: string;
    upd?: Upd;
    parentId?: string;
    slotId?: string;
}
