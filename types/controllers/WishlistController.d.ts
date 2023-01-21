import { EventOutputHolder } from "../routers/EventOutputHolder";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IWishlistActionData } from "../models/eft/wishlist/IWishlistActionData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
export declare class WishlistController {
    protected eventOutputHolder: EventOutputHolder;
    constructor(eventOutputHolder: EventOutputHolder);
    addToWishList(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
    removeFromWishList(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
}
