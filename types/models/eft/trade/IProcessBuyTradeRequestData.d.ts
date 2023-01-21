import { IProcessBaseTradeRequestData } from "./IProcessBaseTradeRequestData";
export interface IProcessBuyTradeRequestData extends IProcessBaseTradeRequestData {
    Action: "buy_from_trader" | "TradingConfirm" | "RestoreHealth" | "";
    type: string;
    tid: string;
    item_id: string;
    count: number;
    scheme_id: number;
    scheme_items: SchemeItem[];
}
export interface SchemeItem {
    id: string;
    count: number;
}
