import { IRagfairOffer } from "./IRagfairOffer";
export interface IGetOffersResult {
    categories?: Record<string, number>;
    offers: IRagfairOffer[];
    offersCount: number;
    selectedCategory: string;
}
