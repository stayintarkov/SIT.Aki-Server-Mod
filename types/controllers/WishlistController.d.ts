import { EventOutputHolder } from "../routers/EventOutputHolder";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IWishlistActionData } from "../models/eft/wishlist/IWishlistActionData";
export declare class WishlistController {
    protected eventOutputHolder: EventOutputHolder;
    constructor(eventOutputHolder: EventOutputHolder);
    addToWishList(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
    removeFromWishList(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
}
