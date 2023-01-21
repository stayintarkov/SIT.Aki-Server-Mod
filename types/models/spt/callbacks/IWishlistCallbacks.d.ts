import { IPmcData } from "../../eft/common/IPmcData";
import { IWishlistActionData } from "../../eft/wishlist/IWishlistActionData";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
export interface IWishlistCallbacks {
    addToWishlist(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
    removeFromWishlist(pmcData: IPmcData, body: IWishlistActionData, sessionID: string): IItemEventRouterResponse;
}
