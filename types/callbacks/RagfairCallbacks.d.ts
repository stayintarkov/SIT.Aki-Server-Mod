import { OnLoad } from "../di/OnLoad";
import { OnUpdate } from "../di/OnUpdate";
import { RagfairController } from "../controllers/RagfairController";
import { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IGetBodyResponseData } from "../models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "../models/eft/httpResponse/INullResponseData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IAddOfferRequestData } from "../models/eft/ragfair/IAddOfferRequestData";
import { IExtendOfferRequestData } from "../models/eft/ragfair/IExtendOfferRequestData";
import { IGetItemPriceResult } from "../models/eft/ragfair/IGetItemPriceResult";
import { IGetMarketPriceRequestData } from "../models/eft/ragfair/IGetMarketPriceRequestData";
import { IGetOffersResult } from "../models/eft/ragfair/IGetOffersResult";
import { IRemoveOfferRequestData } from "../models/eft/ragfair/IRemoveOfferRequestData";
import { ISearchRequestData } from "../models/eft/ragfair/ISearchRequestData";
import { ISendRagfairReportRequestData } from "../models/eft/ragfair/ISendRagfairReportRequestData";
import { IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { ConfigServer } from "../servers/ConfigServer";
import { RagfairServer } from "../servers/RagfairServer";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { JsonUtil } from "../utils/JsonUtil";
/**
 * Handle ragfair related callback events
 */
export declare class RagfairCallbacks implements OnLoad, OnUpdate {
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected ragfairServer: RagfairServer;
    protected ragfairController: RagfairController;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    constructor(httpResponse: HttpResponseUtil, jsonUtil: JsonUtil, ragfairServer: RagfairServer, ragfairController: RagfairController, configServer: ConfigServer);
    onLoad(): Promise<void>;
    getRoute(): string;
    search(url: string, info: ISearchRequestData, sessionID: string): IGetBodyResponseData<IGetOffersResult>;
    getMarketPrice(url: string, info: IGetMarketPriceRequestData, sessionID: string): IGetBodyResponseData<IGetItemPriceResult>;
    addOffer(pmcData: IPmcData, info: IAddOfferRequestData, sessionID: string): IItemEventRouterResponse;
    removeOffer(pmcData: IPmcData, info: IRemoveOfferRequestData, sessionID: string): IItemEventRouterResponse;
    extendOffer(pmcData: IPmcData, info: IExtendOfferRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle /client/items/prices
     * Called when clicking an item to list on flea
     */
    getFleaPrices(url: string, request: IEmptyRequestData, sessionID: string): IGetBodyResponseData<Record<string, number>>;
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    sendReport(url: string, info: ISendRagfairReportRequestData, sessionID: string): INullResponseData;
}
