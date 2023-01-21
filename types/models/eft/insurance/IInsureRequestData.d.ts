import { IBaseInteractionRequestData } from "../common/request/IBaseInteractionRequestData";
export interface IInsureRequestData extends IBaseInteractionRequestData {
    Action: "Insure";
    tid: string;
    items: string[];
}
