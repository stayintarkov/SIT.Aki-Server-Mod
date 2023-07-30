import { AirdropTypeEnum } from "../../../models/enums/AirdropType";
import { MinMax } from "../../common/MinMax";
import { IBaseConfig } from "./IBaseConfig";
export interface IAirdropConfig extends IBaseConfig {
    kind: "aki-airdrop";
    airdropChancePercent: AirdropChancePercent;
    airdropTypeWeightings: Record<AirdropTypeEnum, number>;
    /** Lowest point plane will fly at */
    planeMinFlyHeight: number;
    /** Highest point plane will fly at */
    planeMaxFlyHeight: number;
    /** Loudness of plane engine */
    planeVolume: number;
    /** Speed plane flies overhead */
    planeSpeed: number;
    /** Speed loot crate falls after being dropped */
    crateFallSpeed: number;
    /** Container tpls to use when spawning crate - affects container size, keyed by drop type e.g. mixed/weaponArmor/foodMedical/barter */
    containerIds: Record<string, string>;
    /** Earliest time aircraft will spawn in raid */
    airdropMinStartTimeSeconds: number;
    /** Latest time aircraft will spawn in raid */
    airdropMaxStartTimeSeconds: number;
    /** What rewards will the loot crate contain, keyed by drop type e.g. mixed/weaponArmor/foodMedical/barter */
    loot: Record<string, AirdropLoot>;
}
/** Chance map will have an airdrop occur out of 100 - locations not included count as 0% */
export interface AirdropChancePercent {
    bigmap: number;
    woods: number;
    lighthouse: number;
    shoreline: number;
    interchange: number;
    reserve: number;
    tarkovStreets: number;
}
/** Loot inside crate */
export interface AirdropLoot {
    /** Min/max of weapons inside crate */
    presetCount?: MinMax;
    /** Min/max of items inside crate */
    itemCount: MinMax;
    /** Min/max of sealed weapon boxes inside crate */
    weaponCrateCount: MinMax;
    /** Items to never allow - tpls */
    itemBlacklist: string[];
    /** Item type (parentId) to allow inside crate */
    itemTypeWhitelist: string[];
    /** Item type/ item tpls to limit count of inside crate - key: item base type: value: max count */
    itemLimits: Record<string, number>;
    /** Items to limit stack size of key: item tpl value: min/max stack size */
    itemStackLimits: Record<string, MinMax>;
    /** Armor levels to allow inside crate e.g. [4,5,6] */
    armorLevelWhitelist?: number[];
}
