export interface IProcessRagfairTradeRequestData {
    Action: string;
    offers: Offer[];
}
export interface Offer {
    id: string;
    count: number;
    items: Item[];
}
export interface Item {
    id: string;
    count: number;
}
