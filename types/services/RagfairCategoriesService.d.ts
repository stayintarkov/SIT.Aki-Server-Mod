import { IRagfairOffer } from "../models/eft/ragfair/IRagfairOffer";
import { ILogger } from "../models/spt/utils/ILogger";
export declare class RagfairCategoriesService {
    protected logger: ILogger;
    protected categories: Record<string, number>;
    constructor(logger: ILogger);
    /**
     * Get all flea categories and their count of offers
     * @returns item categories and count
     */
    getAllCategories(): Record<string, number>;
    /**
     * With the supplied items, get custom categories
     * @returns a custom list of categories
     */
    getBespokeCategories(offers: IRagfairOffer[]): Record<string, number>;
    /**
     * Take an array of ragfair offers and create a dictionary of items with thier corrisponding offer count
     * @param offers ragfair offers
     * @returns categories and count
     */
    protected processOffersIntoCategories(offers: IRagfairOffer[]): Record<string, number>;
    /**
     * Increment or decrement a category array
     * @param offer Offer to process
     * @param categories Categories to update
     * @param increment (Optional) Should item be incremented or decremented
     */
    protected addOrIncrementCategory(offer: IRagfairOffer, categories: Record<string, number>, increment?: boolean): void;
    /**
     * Increase category count by 1
     * @param offer
     */
    incrementCategory(offer: IRagfairOffer): void;
    /**
     * Reduce category count by 1
     * @param offer
     */
    decrementCategory(offer: IRagfairOffer): void;
}
