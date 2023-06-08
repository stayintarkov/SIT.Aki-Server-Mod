import { QuestStatus } from "../../../models/enums/QuestStatus";
import { Health, Productive, Skills, TraderInfo } from "../common/tables/IBotBase";
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
    production: Record<string, Productive>;
    /** Hideout area improvement id */
    improvements: Record<string, Improvement>;
    skills: Skills;
    health: Health;
    traderRelations: Record<string, TraderInfo>;
    repeatableQuests?: IPmcDataRepeatableQuest[];
    recipeUnlocked: Record<string, boolean>;
    questsStatus: QuestStatusChange[];
}
export interface QuestStatusChange {
    qid: string;
    startTime: number;
    status: QuestStatus;
    statusTimers: Record<QuestStatus, number>;
    completedConditions: string[];
    availableAfter: number;
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
export interface Improvement {
    completed: boolean;
    improveCompleteTimestamp: number;
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
