import { IPmcData } from "../models/eft/common/IPmcData";
import { ITraderAssort } from "../models/eft/common/tables/ITrader";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IRagfairOffer } from "../models/eft/ragfair/IRagfairOffer";
import { ISearchRequestData } from "../models/eft/ragfair/ISearchRequestData";
import { IQuestConfig } from "../models/spt/config/IQuestConfig";
import { IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { LocaleService } from "../services/LocaleService";
import { RagfairOfferService } from "../services/RagfairOfferService";
import { HashUtil } from "../utils/HashUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { DialogueHelper } from "./DialogueHelper";
import { ItemHelper } from "./ItemHelper";
import { PaymentHelper } from "./PaymentHelper";
import { PresetHelper } from "./PresetHelper";
import { ProfileHelper } from "./ProfileHelper";
import { RagfairHelper } from "./RagfairHelper";
import { RagfairServerHelper } from "./RagfairServerHelper";
import { RagfairSortHelper } from "./RagfairSortHelper";
import { TraderHelper } from "./TraderHelper";
export declare class RagfairOfferHelper {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected hashUtil: HashUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseServer: DatabaseServer;
    protected traderHelper: TraderHelper;
    protected saveServer: SaveServer;
    protected dialogueHelper: DialogueHelper;
    protected itemHelper: ItemHelper;
    protected paymentHelper: PaymentHelper;
    protected presetHelper: PresetHelper;
    protected profileHelper: ProfileHelper;
    protected ragfairServerHelper: RagfairServerHelper;
    protected ragfairSortHelper: RagfairSortHelper;
    protected ragfairHelper: RagfairHelper;
    protected ragfairOfferService: RagfairOfferService;
    protected localeService: LocaleService;
    protected configServer: ConfigServer;
    protected static goodSoldTemplate: string;
    protected ragfairConfig: IRagfairConfig;
    protected questConfig: IQuestConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, hashUtil: HashUtil, eventOutputHolder: EventOutputHolder, databaseServer: DatabaseServer, traderHelper: TraderHelper, saveServer: SaveServer, dialogueHelper: DialogueHelper, itemHelper: ItemHelper, paymentHelper: PaymentHelper, presetHelper: PresetHelper, profileHelper: ProfileHelper, ragfairServerHelper: RagfairServerHelper, ragfairSortHelper: RagfairSortHelper, ragfairHelper: RagfairHelper, ragfairOfferService: RagfairOfferService, localeService: LocaleService, configServer: ConfigServer);
    getValidOffers(searchRequest: ISearchRequestData, itemsToAdd: string[], traderAssorts: Record<string, ITraderAssort>, pmcProfile: IPmcData): IRagfairOffer[];
    getOffersForBuild(info: ISearchRequestData, itemsToAdd: string[], assorts: Record<string, ITraderAssort>, pmcProfile: IPmcData): IRagfairOffer[];
    /**
     * Check if trader offers' BuyRestrictionMax value has been reached
     * @param offer offer to check restriction properties of
     * @returns true if restriction reached, false if no restrictions/not reached
     */
    protected traderBuyRestrictionReached(offer: IRagfairOffer): boolean;
    /**
     * Get an array of flea offers that are inaccessible to player due to their inadequate loyalty level
     * @param offers Offers to check
     * @param pmcProfile Players profile with trader loyalty levels
     */
    protected getLoyaltyLockedOffers(offers: IRagfairOffer[], pmcProfile: IPmcData): string[];
    processOffersOnProfile(sessionID: string): boolean;
    protected getProfileOffers(sessionID: string): IRagfairOffer[];
    protected deleteOfferByOfferId(sessionID: string, offerId: string): void;
    protected completeOffer(sessionID: string, offer: IRagfairOffer, boughtAmount: number): IItemEventRouterResponse;
    isDisplayableOffer(info: ISearchRequestData, itemsToAdd: string[], traderAssorts: Record<string, ITraderAssort>, offer: IRagfairOffer, pmcProfile: IPmcData): boolean;
}
