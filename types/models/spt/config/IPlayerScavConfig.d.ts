import { MinMax } from "../../common/MinMax";
import { IBaseConfig } from "./IBaseConfig";
export interface IPlayerScavConfig extends IBaseConfig {
    kind: "aki-playerscav";
    karmaLevel: Record<string, KarmaLevel>;
}
export interface KarmaLevel {
    botTypeForLoot: string;
    modifiers: Modifiers;
    itemLimits: ItemLimits;
    equipmentBlacklist: Record<string, string[]>;
    labsAccessCardChancePercent: number;
}
export interface Modifiers {
    equipment: Record<string, number>;
    mod: Record<string, number>;
}
export interface ItemLimits {
    healing: MinMax;
    drugs: MinMax;
    stims: MinMax;
    looseLoot: MinMax;
    magazines: MinMax;
    grenades: MinMax;
}
