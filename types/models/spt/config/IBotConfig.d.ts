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
    /** How many stacks of secret ammo should a bot have in its bot secure container */
    secureContainerAmmoStackCount: number;
    /** Batch generation size when type not available in cache */
    botGenerationBatchSizePerType: number;
}
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
}
export interface LootNvalue {
    scav: number;
    pmc: number;
}
export interface EquipmentFilters {
    weaponModLimits: ModLimits;
    weaponSightWhitelist: Record<string, string[]>;
    faceShieldIsActiveChancePercent?: number;
    lightLaserIsActiveChancePercent?: number;
    nvgIsActiveChancePercent?: number;
    randomisation: RandomisationDetails[];
    blacklist: EquipmentFilterDetails[];
    whitelist: EquipmentFilterDetails[];
    clothing: WeightingAdjustmentDetails[];
    weightingAdjustments: WeightingAdjustmentDetails[];
}
export interface ModLimits {
    /** How many scopes are allowed on a weapon - hard coded to work with OPTIC_SCOPE, ASSAULT_SCOPE, COLLIMATOR, COMPACT_COLLIMATOR */
    scopeLimit?: number;
    /** How many lasers or lights are allowed on a weapon - hard coded to work with TACTICAL_COMBO, and FLASHLIGHT */
    lightLaserLimit?: number;
}
export interface RandomisationDetails {
    levelRange: MinMax;
    randomisedWeaponModSlots?: string[];
    randomisedArmorSlots?: string[];
    /** Equipment chances */
    equipment?: Record<string, number>;
    /** Modc chances */
    mods?: Record<string, number>;
}
export interface EquipmentFilterDetails {
    levelRange: MinMax;
    equipment: Record<string, string[]>;
    cartridge: Record<string, string[]>;
}
export interface WeightingAdjustmentDetails {
    levelRange: MinMax;
    ammo?: AdjustmentDetails;
    equipment?: AdjustmentDetails;
    clothing?: AdjustmentDetails;
}
export interface AdjustmentDetails {
    add: Record<string, Record<string, number>>;
    edit: Record<string, Record<string, number>>;
}
