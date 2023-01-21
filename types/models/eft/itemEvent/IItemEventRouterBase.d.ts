import { Skills } from "../common/tables/IBotBase";
import { Item, Upd } from "../common/tables/IItem";
import { IQuest } from "../common/tables/IQuest";
import { IPmcDataRepeatableQuest } from "../common/tables/IRepeatableQuests";
import { IRagfairOffer } from "../ragfair/IRagfairOffer";
export interface IItemEventRouterBase {
    warnings: Warning[];
    profileChanges: TProfileChanges | "";
}
export type TProfileChanges = Record<string, ProfileChange>;
export interface Warning {
    index: number;
    errmsg: string;
    code?: string;
    data?: any;
}
export interface ProfileChange {
    _id: string;
    experience: number;
    quests: IQuest[];
    ragFairOffers: IRagfairOffer[];
    builds: BuildChange[];
    items: ItemChanges;
    production: Record<string, Production>;
    skills: Skills;
    traderRelations: Record<string, TraderRelations>;
    repeatableQuests?: IPmcDataRepeatableQuest[];
}
export interface BuildChange {
    id: string;
    name: string;
    root: string;
    items: Item[];
}
export interface ItemChanges {
    new: Product[];
    change: Product[];
    del: Product[];
}
export interface Production {
    Progress: number;
    StartTimestamp: number;
    ProductionTime: number;
    inProgress: boolean;
    RecipeId: string;
    Products: Product[];
}
export interface Product {
    _id: string;
    _tpl?: string;
    parentId?: string;
    slotId?: string;
    location?: ItemChangeLocation;
    upd?: Upd;
}
export interface ItemChangeLocation {
    x: number;
    y: number;
    r: number;
    isSearched?: boolean;
}
export interface TraderRelations {
    salesSum?: number;
    standing?: number;
    loyalty?: number;
    unlocked?: boolean;
    disabled?: boolean;
}
