import { MinMaxWithWhitelist } from "../../../models/eft/common/tables/IBotType";
import { MinMax } from "../../common/MinMax";
import { IBaseConfig } from "./IBaseConfig";
import { IBotDurability } from "./IBotDurability";
import { IPmcConfig } from "./IPmcConfig";
export interface IBotConfig extends IBaseConfig {
    kind: "aki-bot";
    /** How many variants of each bot should be generated on raid start */
    presetBatch: PresetBatch;
    /** What bot types should be classified as bosses */
    bosses: string[];
    /** Control weapon/armor durability min/max values for each bot type */
    durability: IBotDurability;
    /** Control the weighting of how expensive an average loot item is on a PMC or Scav */
    lootNValue: LootNvalue;
    /** Control what bots are added to a bots revenge list key: bottype, value: bottypes to revenge on seeing their death */
    revenge: Record<string, string[]>;
    /** PMC bot specific config settings */
    pmc: IPmcConfig;
    /** Control how many items are allowed to spawn on a bot
     * key: bottype, value: <key: itemTpl: value: max item count> */
    itemSpawnLimits: Record<string, Record<string, number>>;
    /** Blacklist/whitelist items on a bot */
    equipment: Record<string, EquipmentFilters>;
    /** Show a bots botType value after their name */
    showTypeInNickname: boolean;
    /** Max number of bots that can be spawned in a raid at any one time */
    maxBotCap: Record<string, number>;
    chanceAssaultScavHasPlayerScavName: number;
    /** How many stacks of secret ammo should a bot have in its bot secure container */
    secureContainerAmmoStackCount: number;
    /** Batch generation size when type not available in cache */
    botGenerationBatchSizePerType: number;
}
/** Number of bots to generate and store in cache on raid start per bot type */
export interface PresetBatch {
    assault: number;
    bossBully: number;
    bossGluhar: number;
    bossKilla: number;
    bossKojaniy: number;
    bossSanitar: number;
    bossTagilla: number;
    bossKnight: number;
    bossTest: number;
    cursedAssault: number;
    followerBully: number;
    followerGluharAssault: number;
    followerGluharScout: number;
    followerGluharSecurity: number;
    followerGluharSnipe: number;
    followerKojaniy: number;
    followerSanitar: number;
    followerTagilla: number;
    followerBirdEye: number;
    followerBigPipe: number;
    followerTest: number;
    marksman: number;
    pmcBot: number;
    sectantPriest: number;
    sectantWarrior: number;
    gifter: number;
    test: number;
    exUsec: number;
    arenaFighterEvent: number;
    arenaFighter: number;
    crazyAssaultEvent: number;
    sptUsec: number;
    sptBear: number;
}
export interface LootNvalue {
    scav: number;
    pmc: number;
}
export interface EquipmentFilters {
    /** Limits for mod types per weapon .e.g. scopes */
    weaponModLimits: ModLimits;
    /** Whitelsit for weapons allowed per gun */
    weaponSightWhitelist: Record<string, string[]>;
    faceShieldIsActiveChancePercent?: number;
    lightIsActiveDayChancePercent?: number;
    lightIsActiveNightChancePercent?: number;
    laserIsActiveChancePercent?: number;
    nvgIsActiveChanceDayPercent?: number;
    nvgIsActiveChanceNightPercent?: number;
    /** Adjust weighting/chances of items on bot by level of bot */
    randomisation: RandomisationDetails[];
    /** Blacklist equipment by level of bot */
    blacklist: EquipmentFilterDetails[];
    /** Whitelist equipment by level of bot */
    whitelist: EquipmentFilterDetails[];
    clothing: WeightingAdjustmentDetails[];
    /** Adjust clothing choice weighting by level of bot */
    weightingAdjustments: WeightingAdjustmentDetails[];
}
export interface ModLimits {
    /** How many scopes are allowed on a weapon - hard coded to work with OPTIC_SCOPE, ASSAULT_SCOPE, COLLIMATOR, COMPACT_COLLIMATOR */
    scopeLimit?: number;
    /** How many lasers or lights are allowed on a weapon - hard coded to work with TACTICAL_COMBO, and FLASHLIGHT */
    lightLaserLimit?: number;
}
export interface RandomisationDetails {
    /** Between what levels do these randomisation setting apply to */
    levelRange: MinMax;
    generation?: Record<string, MinMaxWithWhitelist>;
    /** Mod slots that should be fully randomisate -ignores mods from bottype.json */
    randomisedWeaponModSlots?: string[];
    /** Armor slots that should be randomised e.g. 'Headwear, Armband' */
    randomisedArmorSlots?: string[];
    /** Equipment chances */
    equipment?: Record<string, number>;
    /** Mod chances */
    mods?: Record<string, number>;
}
export interface EquipmentFilterDetails {
    /** Between what levels do these equipment filter setting apply to */
    levelRange: MinMax;
    /** Key: mod slot name e.g. mod_magazine, value: item tpls */
    equipment: Record<string, string[]>;
    /** Key: cartridge type e.g. Caliber23x75, value: item tpls */
    cartridge: Record<string, string[]>;
}
export interface WeightingAdjustmentDetails {
    /** Between what levels do these weight settings apply to */
    levelRange: MinMax;
    /** Key: ammo type e.g. Caliber556x45NATO, value: item tpl + weight */
    ammo?: AdjustmentDetails;
    /** Key: equipment slot e.g. TacticalVest, value: item tpl + weight */
    equipment?: AdjustmentDetails;
    /** Key: clothing slor e.g. feet, value: item tpl + weight */
    clothing?: AdjustmentDetails;
}
export interface AdjustmentDetails {
    add: Record<string, Record<string, number>>;
    edit: Record<string, Record<string, number>>;
}
