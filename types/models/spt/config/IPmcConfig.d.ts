import { MinMax } from "../../common/MinMax";
export interface IPmcConfig {
    vestLoot: SlotLootSettings;
    pocketLoot: SlotLootSettings;
    backpackLoot: SlotLootSettings;
    dynamicLoot: DynamicLoot;
    useDifficultyOverride: boolean;
    difficulty: string;
    looseWeaponInBackpackChancePercent: number;
    looseWeaponInBackpackLootMinMax: MinMax;
    isUsec: number;
    usecType: string;
    bearType: string;
    chanceSameSideIsHostilePercent: number;
    /** key: location, value: type for usec/bear */
    pmcType: Record<string, Record<string, Record<string, number>>>;
    maxBackpackLootTotalRub: number;
    maxPocketLootTotalRub: number;
    maxVestLootTotalRub: number;
    convertIntoPmcChance: Record<string, MinMax>;
    enemyTypes: string[];
    botRelativeLevelDeltaMax: number;
}
export interface PmcTypes {
    usec: string;
    bear: string;
}
export interface SlotLootSettings {
    whitelist: string[];
    blacklist: string[];
    moneyStackLimits: Record<string, number>;
}
export interface DynamicLoot {
    moneyStackLimits: Record<string, number>;
}
