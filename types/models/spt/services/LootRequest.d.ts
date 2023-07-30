import { MinMax } from "../../common/MinMax";
export interface LootRequest {
    presetCount: MinMax;
    itemCount: MinMax;
    weaponCrateCount: MinMax;
    itemBlacklist: string[];
    itemTypeWhitelist: string[];
    /** key: item base type: value: max count */
    itemLimits: Record<string, number>;
    itemStackLimits: Record<string, MinMax>;
    armorLevelWhitelist: number[];
}
