export interface IAddItemRequestData {
    tid: string;
    items: AddItem[];
}
export interface AddItem {
    count: number;
    isPreset?: boolean;
    item_id: string;
}
