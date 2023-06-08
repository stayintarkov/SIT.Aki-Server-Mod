import { ProfileHelper } from "../helpers/ProfileHelper";
import { RagfairServerHelper } from "../helpers/RagfairServerHelper";
import { Item } from "../models/eft/common/tables/IItem";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IRagfairOffer } from "../models/eft/ragfair/IRagfairOffer";
import { IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { RagfairOfferHolder } from "../utils/RagfairOfferHolder";
import { TimeUtil } from "../utils/TimeUtil";
import { LocalisationService } from "./LocalisationService";
import { RagfairCategoriesService } from "./RagfairCategoriesService";
export declare class RagfairOfferService {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected databaseServer: DatabaseServer;
    protected saveServer: SaveServer;
    protected ragfairServerHelper: RagfairServerHelper;
    protected ragfairCategoriesService: RagfairCategoriesService;
    protected profileHelper: ProfileHelper;
    protected eventOutputHolder: EventOutputHolder;
    protected httpResponse: HttpResponseUtil;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected playerOffersLoaded: boolean;
    protected expiredOffers: Record<string, IRagfairOffer>;
    protected ragfairConfig: IRagfairConfig;
    protected ragfairOfferHandler: RagfairOfferHolder;
    constructor(logger: ILogger, timeUtil: TimeUtil, databaseServer: DatabaseServer, saveServer: SaveServer, ragfairServerHelper: RagfairServerHelper, ragfairCategoriesService: RagfairCategoriesService, profileHelper: ProfileHelper, eventOutputHolder: EventOutputHolder, httpResponse: HttpResponseUtil, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Get all offers
     * @returns IRagfairOffer array
     */
    getOffers(): IRagfairOffer[];
    getOfferByOfferId(offerId: string): IRagfairOffer;
    getOffersOfType(templateId: string): IRagfairOffer[];
    addOffer(offer: IRagfairOffer): void;
    addOfferToExpired(staleOffer: IRagfairOffer): void;
    getExpiredOfferCount(): number;
    /**
     * Get an array of expired items not yet processed into new offers
     * @returns items that need to be turned into offers
     */
    getExpiredOfferItems(): Item[];
    resetExpiredOffers(): void;
    /**
     * Does the offer exist on the ragfair
     * @param offerId offer id to check for
     * @returns offer exists - true
     */
    doesOfferExist(offerId: string): boolean;
    /**
     * Remove an offer from ragfair by offer id
     * @param offerId Offer id to remove
     */
    removeOfferById(offerId: string): void;
    /**
     * Reduce size of an offer stack by specified amount
     * @param offerId Offer to adjust stack size of
     * @param amount How much to deduct from offers stack size
     */
    removeOfferStack(offerId: string, amount: number): void;
    removeAllOffersByTrader(traderId: string): void;
    /**
     * Do the trader offers on flea need to be refreshed
     * @param traderID Trader to check
     * @returns true if they do
     */
    traderOffersNeedRefreshing(traderID: string): boolean;
    addPlayerOffers(): void;
    expireStaleOffers(): void;
    /**
     * Remove stale offer from flea
     * @param staleOffer Stale offer to process
     */
    protected processStaleOffer(staleOffer: IRagfairOffer): void;
    protected returnPlayerOffer(offer: IRagfairOffer): IItemEventRouterResponse;
}
