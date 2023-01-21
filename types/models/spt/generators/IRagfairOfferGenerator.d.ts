import { IBarterScheme } from "../../eft/common/tables/ITrader";
import { IRagfairOffer } from "../../eft/ragfair/IRagfairOffer";
import { Item } from "../../eft/common/tables/IItem";
export interface IRagfairOfferGenerator {
    createOffer(userID: string, time: number, items: Item[], barterScheme: IBarterScheme[], loyalLevel: number, price: number, sellInOnePiece: boolean): IRagfairOffer;
}
