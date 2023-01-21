import { IProcessBaseTradeRequestData } from "./IProcessBaseTradeRequestData";
export interface IProcessSellTradeRequestData extends IProcessBaseTradeRequestData {
    Action: "sell_to_trader";
    type: string;
    tid: string;
    items: Item[];
}
export interface Item {
    id: string;
    count: number;
    scheme_id: number;
}
