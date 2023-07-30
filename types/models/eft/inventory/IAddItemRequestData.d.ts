export interface IAddItemRequestData {
    /** Trader id */
    tid: string;
    items: AddItem[];
}
export interface AddItem {
    count: number;
    isPreset?: boolean;
    item_id: string;
}
