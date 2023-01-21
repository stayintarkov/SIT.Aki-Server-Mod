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
export interface Upd {
    Repairable: Repairable;
    FireMode: FireMode;
}
export interface Repairable {
    MaxDurability: number;
    Durability: number;
}
export interface FireMode {
    FireMode: string;
}
