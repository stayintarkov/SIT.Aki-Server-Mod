import { HandbookHelper } from "../helpers/HandbookHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { PaymentHelper } from "../helpers/PaymentHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { RagfairServerHelper } from "../helpers/RagfairServerHelper";
import { Item } from "../models/eft/common/tables/IItem";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { IBarterScheme } from "../models/eft/common/tables/ITrader";
import { IRagfairOffer, OfferRequirement } from "../models/eft/ragfair/IRagfairOffer";
import { Dynamic, IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { FenceService } from "../services/FenceService";
import { LocalisationService } from "../services/LocalisationService";
import { RagfairCategoriesService } from "../services/RagfairCategoriesService";
import { RagfairOfferService } from "../services/RagfairOfferService";
import { RagfairPriceService } from "../services/RagfairPriceService";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { RagfairAssortGenerator } from "./RagfairAssortGenerator";
export declare class RagfairOfferGenerator {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected databaseServer: DatabaseServer;
    protected ragfairServerHelper: RagfairServerHelper;
    protected handbookHelper: HandbookHelper;
    protected saveServer: SaveServer;
    protected presetHelper: PresetHelper;
    protected ragfairAssortGenerator: RagfairAssortGenerator;
    protected ragfairOfferService: RagfairOfferService;
    protected ragfairPriceService: RagfairPriceService;
    protected localisationService: LocalisationService;
    protected paymentHelper: PaymentHelper;
    protected ragfairCategoriesService: RagfairCategoriesService;
    protected fenceService: FenceService;
    protected itemHelper: ItemHelper;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    protected allowedFleaPriceItemsForBarter: {
        tpl: string;
        price: number;
    }[];
    constructor(logger: ILogger, jsonUtil: JsonUtil, hashUtil: HashUtil, randomUtil: RandomUtil, timeUtil: TimeUtil, databaseServer: DatabaseServer, ragfairServerHelper: RagfairServerHelper, handbookHelper: HandbookHelper, saveServer: SaveServer, presetHelper: PresetHelper, ragfairAssortGenerator: RagfairAssortGenerator, ragfairOfferService: RagfairOfferService, ragfairPriceService: RagfairPriceService, localisationService: LocalisationService, paymentHelper: PaymentHelper, ragfairCategoriesService: RagfairCategoriesService, fenceService: FenceService, itemHelper: ItemHelper, configServer: ConfigServer);
    /**
     * Create a flea offer and store it in the Ragfair server offers array
     * @param userID Owner of the offer
     * @param time Time offer is listed at
     * @param items Items in the offer
     * @param barterScheme Cost of item (currency or barter)
     * @param loyalLevel Loyalty level needed to buy item
     * @param sellInOnePiece Flags sellInOnePiece to be true
     * @returns IRagfairOffer
     */
    createFleaOffer(userID: string, time: number, items: Item[], barterScheme: IBarterScheme[], loyalLevel: number, sellInOnePiece?: boolean): IRagfairOffer;
    /**
     * Create an offer object ready to send to ragfairOfferService.addOffer()
     * @param userID Owner of the offer
     * @param time Time offer is listed at
     * @param items Items in the offer
     * @param barterScheme Cost of item (currency or barter)
     * @param loyalLevel Loyalty level needed to buy item
     * @param sellInOnePiece Set StackObjectsCount to 1
     * @returns IRagfairOffer
     */
    protected createOffer(userID: string, time: number, items: Item[], barterScheme: IBarterScheme[], loyalLevel: number, sellInOnePiece?: boolean): IRagfairOffer;
    /**
     * Calculate the offer price that's listed on the flea listing
     * @param offerRequirements barter requirements for offer
     * @returns rouble cost of offer
     */
    protected convertOfferRequirementsIntoRoubles(offerRequirements: OfferRequirement[]): number;
    /**
     * Get avatar url from trader table in db
     * @param isTrader Is user we're getting avatar for a trader
     * @param userId persons id to get avatar of
     * @returns url of avatar
     */
    protected getAvatarUrl(isTrader: boolean, userId: string): string;
    /**
     * Convert a count of currency into roubles
     * @param currencyCount amount of currency to convert into roubles
     * @param currencyType Type of currency (euro/dollar/rouble)
     * @returns count of roubles
     */
    protected calculateRoublePrice(currencyCount: number, currencyType: string): number;
    /**
     * Check userId, if its a player, return their pmc _id, otherwise return userId parameter
     * @param userId Users Id to check
     * @returns Users Id
     */
    protected getTraderId(userId: string): string;
    /**
     * Get a flea trading rating for the passed in user
     * @param userId User to get flea rating of
     * @returns Flea rating value
     */
    protected getRating(userId: string): number;
    /**
     * Is the offers user rating growing
     * @param userID user to check rating of
     * @returns true if its growing
     */
    protected getRatingGrowing(userID: string): boolean;
    /**
     * Get number of section until offer should expire
     * @param userID Id of the offer owner
     * @param time Time the offer is posted
     * @returns number of seconds until offer expires
     */
    protected getOfferEndTime(userID: string, time: number): number;
    /**
     * Create multiple offers for items by using a unique list of items we've generated previously
     * @param expiredOffers optional, expired offers to regenerate
     */
    generateDynamicOffers(expiredOffers?: Item[]): Promise<void>;
    /**
     *
     * @param assortItemIndex Index of assort item
     * @param assortItemsToProcess Item array containing index
     * @param expiredOffers Currently expired offers on flea
     * @param config Ragfair dynamic config
     */
    protected createOffersForItems(assortItemIndex: string, assortItemsToProcess: Item[], expiredOffers: Item[], config: Dynamic): Promise<void>;
    /**
     * Create one flea offer for a specific item
     * @param items Item to create offer for
     * @param isPreset Is item a weapon preset
     * @param itemDetails raw db item details
     * @returns Item array
     */
    protected createSingleOfferForItem(items: Item[], isPreset: boolean, itemDetails: [boolean, ITemplateItem]): Promise<void>;
    /**
     * Generate trader offers on flea using the traders assort data
     * @param traderID Trader to generate offers for
     */
    generateFleaOffersForTrader(traderID: string): void;
    /**
     * Get array of an item with its mods + condition properties (e.g durability)
     * Apply randomisation adjustments to condition if item base is found in ragfair.json/dynamic/condition
     * @param userID id of owner of item
     * @param itemWithMods Item and mods, get condition of first item (only first array item is used)
     * @param itemDetails db details of first item
     * @returns
     */
    protected randomiseItemUpdProperties(userID: string, itemWithMods: Item[], itemDetails: ITemplateItem): Item[];
    /**
     * Get the relevant condition id if item tpl matches in ragfair.json/condition
     * @param tpl Item to look for matching condition object
     * @returns condition id
     */
    protected getDynamicConditionIdForTpl(tpl: string): string;
    /**
     * Alter an items condition based on its item base type
     * @param conditionSettingsId also the parentId of item being altered
     * @param item Item to adjust condition details of
     * @param itemDetails db item details of first item in array
     */
    protected randomiseItemCondition(conditionSettingsId: string, item: Item, itemDetails: ITemplateItem): void;
    /**
     * Adjust an items durability/maxDurability value
     * @param item item (weapon/armor) to adjust
     * @param multiplier Value to multiple durability by
     */
    protected randomiseDurabilityValues(item: Item, multiplier: number): void;
    /**
     * Add missing conditions to an item if needed
     * Durabiltiy for repairable items
     * HpResource for medical items
     * @param item item to add conditions to
     * @returns Item with conditions added
     */
    protected addMissingConditions(item: Item): Item;
    /**
     * Create a barter-based barter scheme, if not possible, fall back to making barter scheme currency based
     * @param offerItems Items for sale in offer
     * @returns Barter scheme
     */
    protected createBarterBarterScheme(offerItems: Item[]): IBarterScheme[];
    /**
     * Get an array of flea prices + item tpl, cached in generator class inside `allowedFleaPriceItemsForBarter`
     * @returns array with tpl/price values
     */
    protected getFleaPricesAsArray(): {
        tpl: string;
        price: number;
    }[];
    /**
     * Create a random currency-based barter scheme for an array of items
     * @param offerItems Items on offer
     * @param isPackOffer Is the barter scheme being created for a pack offer
     * @param multipler What to multiply the resulting price by
     * @returns Barter scheme for offer
     */
    protected createCurrencyBarterScheme(offerItems: Item[], isPackOffer: boolean, multipler?: number): IBarterScheme[];
}
