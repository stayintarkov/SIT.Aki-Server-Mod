import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
import { IItemEventRouterRequest } from "../../eft/itemEvent/IItemEventRouterRequest";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
export interface IItemEventCallbacks {
    handleEvents(url: string, info: IItemEventRouterRequest, sessionID: string): IGetBodyResponseData<IItemEventRouterResponse>;
}
