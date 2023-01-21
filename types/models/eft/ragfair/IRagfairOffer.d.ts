import { MemberCategory } from "../../enums/MemberCategory";
import { Item } from "../common/tables/IItem";
export interface IRagfairOffer {
    sellResult?: SellResult[];
    _id: string;
    items: Item[];
    requirements: OfferRequirement[];
    root: string;
    intId: number;
    /** Handbook price */
    itemsCost: number;
    /** Rouble price */
    requirementsCost: number;
    startTime: number;
    endTime: number;
    sellInOnePiece: boolean;
    loyaltyLevel: number;
    buyRestrictionMax?: number;
    buyRestrictionCurrent?: number;
    locked: boolean;
    unlimitedCount: boolean;
    /** Rouble price */
    summaryCost: number;
    user: IRagfairOfferUser;
    notAvailable: boolean;
    CurrentItemCount: number;
    priority: boolean;
}
export interface OfferRequirement {
    _tpl: string;
    count: number;
    onlyFunctional: boolean;
}
export interface IRagfairOfferUser {
    id: string;
    nickname?: string;
    rating?: number;
    memberType: MemberCategory;
    avatar?: string;
    isRatingGrowing?: boolean;
}
export interface SellResult {
    sellTime: number;
    amount: number;
}
