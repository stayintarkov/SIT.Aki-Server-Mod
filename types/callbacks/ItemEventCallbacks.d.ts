import { IGetBodyResponseData } from "../models/eft/httpResponse/IGetBodyResponseData";
import { Warning } from "../models/eft/itemEvent/IItemEventRouterBase";
import { IItemEventRouterRequest } from "../models/eft/itemEvent/IItemEventRouterRequest";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { ItemEventRouter } from "../routers/ItemEventRouter";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
export declare class ItemEventCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected itemEventRouter: ItemEventRouter;
    constructor(httpResponse: HttpResponseUtil, itemEventRouter: ItemEventRouter);
    handleEvents(url: string, info: IItemEventRouterRequest, sessionID: string): IGetBodyResponseData<IItemEventRouterResponse>;
    protected getErrorCode(warnings: Warning[]): number;
}
