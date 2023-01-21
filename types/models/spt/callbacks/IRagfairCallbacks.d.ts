import { IPmcData } from "../../eft/common/IPmcData";
import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
import { ISearchRequestData } from "../../eft/ragfair/ISearchRequestData";
import { IEmptyRequestData } from "../../eft/common/IEmptyRequestData";
import { IGetMarketPriceRequestData } from "../../eft/ragfair/IGetMarketPriceRequestData";
import { IAddOfferRequestData } from "../../eft/ragfair/IAddOfferRequestData";
import { IRemoveOfferRequestData } from "../../eft/ragfair/IRemoveOfferRequestData";
import { IExtendOfferRequestData } from "../../eft/ragfair/IExtendOfferRequestData";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
import { IGetItemPriceResult } from "../../eft/ragfair/IGetItemPriceResult";
export interface IRagfairCallbacks {
    load(): void;
    search(url: string, info: ISearchRequestData, sessionID: string): IGetBodyResponseData<any>;
    getMarketPrice(url: string, info: IGetMarketPriceRequestData, sessionID: string): IGetBodyResponseData<IGetItemPriceResult>;
    getItemPrices(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    addOffer(pmcData: IPmcData, info: IAddOfferRequestData, sessionID: string): IItemEventRouterResponse;
    removeOffer(pmcData: IPmcData, info: IRemoveOfferRequestData, sessionID: string): IItemEventRouterResponse;
    extendOffer(pmcData: IPmcData, info: IExtendOfferRequestData, sessionID: string): IItemEventRouterResponse;
    update(timeSinceLastRun: number): boolean;
    updatePlayer(timeSinceLastRun: number): boolean;
}
