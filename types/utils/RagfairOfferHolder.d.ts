import { IRagfairOffer } from "../models/eft/ragfair/IRagfairOffer";
export declare class RagfairOfferHolder {
    private offersById;
    private offersByTemplate;
    private offersByTrader;
    constructor();
    getOfferById(id: string): IRagfairOffer;
    getOffersByTemplate(templateId: string): Array<IRagfairOffer>;
    getOffersByTrader(traderId: string): Array<IRagfairOffer>;
    getOffers(): Array<IRagfairOffer>;
    addOffers(offers: Array<IRagfairOffer>): void;
    addOffer(offer: IRagfairOffer): void;
    removeOffer(offer: IRagfairOffer): void;
    removeOffers(offers: Array<IRagfairOffer>): void;
    removeOfferByTrader(traderId: string): void;
    /**
     * Get an array of stale offers that are still shown to player
     * @returns IRagfairOffer array
     */
    getStaleOffers(time: number): Array<IRagfairOffer>;
    private addOfferByTemplates;
    private addOfferByTrader;
    protected isStale(offer: IRagfairOffer, time: number): boolean;
}
