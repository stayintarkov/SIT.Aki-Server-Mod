import { RagfairOfferGenerator } from "../generators/RagfairOfferGenerator";
import { TraderAssortHelper } from "../helpers/TraderAssortHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IRagfairOffer } from "../models/eft/ragfair/IRagfairOffer";
import { IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { LocalisationService } from "../services/LocalisationService";
import { RagfairCategoriesService } from "../services/RagfairCategoriesService";
import { RagfairOfferService } from "../services/RagfairOfferService";
import { RagfairRequiredItemsService } from "../services/RagfairRequiredItemsService";
import { ConfigServer } from "./ConfigServer";
export declare class RagfairServer {
    protected logger: ILogger;
    protected ragfairOfferGenerator: RagfairOfferGenerator;
    protected ragfairOfferService: RagfairOfferService;
    protected ragfairCategoriesService: RagfairCategoriesService;
    protected ragfairRequiredItemsService: RagfairRequiredItemsService;
    protected localisationService: LocalisationService;
    protected traderHelper: TraderHelper;
    protected traderAssortHelper: TraderAssortHelper;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    constructor(logger: ILogger, ragfairOfferGenerator: RagfairOfferGenerator, ragfairOfferService: RagfairOfferService, ragfairCategoriesService: RagfairCategoriesService, ragfairRequiredItemsService: RagfairRequiredItemsService, localisationService: LocalisationService, traderHelper: TraderHelper, traderAssortHelper: TraderAssortHelper, configServer: ConfigServer);
    load(): Promise<void>;
    update(): Promise<void>;
    /**
     * Get traders who need to be periodically refreshed
     * @returns string array of traders
     */
    protected getUpdateableTraders(): string[];
    getAllCategories(): Record<string, number>;
    getBespokeCategories(offers: IRagfairOffer[]): Record<string, number>;
    /**
     * Disable/Hide an offer from flea
     * @param offerId
     */
    hideOffer(offerId: string): void;
    getOffer(offerID: string): IRagfairOffer;
    getOffers(): IRagfairOffer[];
    removeOfferStack(offerID: string, amount: number): void;
    doesOfferExist(offerId: string): boolean;
    addPlayerOffers(): void;
}
