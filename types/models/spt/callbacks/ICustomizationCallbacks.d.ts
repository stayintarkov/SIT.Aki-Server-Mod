import { IPmcData } from "../../eft/common/IPmcData";
import { IBuyClothingRequestData } from "../../eft/customization/IBuyClothingRequestData";
import { IWearClothingRequestData } from "../../eft/customization/IWearClothingRequestData";
import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
import { ISuit } from "../../eft/common/tables/ITrader";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
export interface ICustomizationCallbacks {
    getSuits(url: string, info: any, sessionID: string): IGetBodyResponseData<any>;
    getTraderSuits(url: string, info: any, sessionID: string): IGetBodyResponseData<ISuit[]>;
    wearClothing(pmcData: IPmcData, body: IWearClothingRequestData, sessionID: string): IItemEventRouterResponse;
    buyClothing(pmcData: IPmcData, body: IBuyClothingRequestData, sessionID: string): IItemEventRouterResponse;
}
