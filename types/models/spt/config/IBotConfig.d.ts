import { GenerationData } from "../../../models/eft/common/tables/IBotType";
import { MinMax } from "../../common/MinMax";
import { IBaseConfig } from "./IBaseConfig";
import { IBotDurability } from "./IBotDurability";
export interface IBotConfig extends IBaseConfig {
    kind: "aki-bot";
    /** How many variants of each bot should be generated on raid start */
    presetBatch: PresetBatch;
    /** What bot types should be classified as bosses */
    bosses: string[];
    /** Control weapon/armor durability min/max values for each bot type */
    durability: IBotDurability;
    /** Controls the percentage values of randomization item resources */
    lootItemResourceRandomization: Record<string, IRandomisedResourceDetails>;
    /** Control the weighting of how expensive an average loot item is on a PMC or Scav */
    lootNValue: LootNvalue;
    /** Control what bots are added to a bots revenge list key: bottype, value: bottypes to revenge on seeing their death */
    revenge: Record<string, string[]>;
    /** Control how many items are allowed to spawn on a bot
     * key: bottype, value: <key: itemTpl: value: max item count> */
    itemSpawnLimits: Record<string, Record<string, number>>;
    /** Blacklist/whitelist items on a bot */
    equipment: Record<string, EquipmentFilters>;
    /** Show a bots botType value after their name */
    showTypeInNickname: boolean;
    /** What ai brain should a normal scav use per map */
    assaultBrainType: Record<string, Record<string, number>>;
    /** Max number of bots that can be spawned in a raid at any one time */
    maxBotCap: Record<string, number>;
    /** Chance scav has fake pscav name e.g. Scav name (player name) */
    chanceAssaultScavHasPlayerScavName: number;
    /** How many stacks of secret ammo should a bot have in its bot secure container */
    secureContainerAmmoStackCount: number;
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
    followerBoar: number;
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
    bossBoar: number;
    bossBoarSniper: number;
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
    /** Whitelist for weapon sight types allowed per gun */
    weaponSightWhitelist: Record<string, string[]>;
    /** Chance face shield is down/active */
    faceShieldIsActiveChancePercent?: number;
    /** Chance gun flashlight is active during the day */
    lightIsActiveDayChancePercent?: number;
    /** Chance gun flashlight is active during the night */
    lightIsActiveNightChancePercent?: number;
    /** Chance gun laser is active during the day */
    laserIsActiveChancePercent?: number;
    /** Chance NODS are down/active during the day */
    nvgIsActiveChanceDayPercent?: number;
    /** Chance NODS are down/active during the night */
    nvgIsActiveChanceNightPercent?: number;
    /** Adjust weighting/chances of items on bot by level of bot */
    randomisation: RandomisationDetails[];
    /** Blacklist equipment by level of bot */
    blacklist: EquipmentFilterDetails[];
    /** Whitelist equipment by level of bot */
    whitelist: EquipmentFilterDetails[];
    /** Adjust equipment/ammo */
    weightingAdjustmentsByBotLevel: WeightingAdjustmentDetails[];
    /** Same as weightingAdjustments but based on player level instead of bot level */
    weightingAdjustmentsByPlayerLevel?: WeightingAdjustmentDetails[];
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
    generation?: Record<string, GenerationData>;
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
    /** Key: clothing slot e.g. feet, value: item tpl + weight */
    clothing?: AdjustmentDetails;
}
export interface AdjustmentDetails {
    add: Record<string, Record<string, number>>;
    edit: Record<string, Record<string, number>>;
}
export interface IRandomisedResourceDetails {
    food: IRandomisedResourceValues;
    meds: IRandomisedResourceValues;
}
export interface IRandomisedResourceValues {
    /** Minimum percent of item to randomized between min and max resource*/
    resourcePercent: number;
    /** Chance for randomization to not occur */
    chanceMaxResourcePercent: number;
}
