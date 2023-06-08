import { MinMax } from "../../../models/common/MinMax";
import { IBaseConfig } from "./IBaseConfig";
export interface IRepairConfig extends IBaseConfig {
    kind: "aki-repair";
    priceMultiplier: number;
    applyRandomizeDurabilityLoss: boolean;
    weaponSkillRepairGain: number;
    armorKitSkillPointGainPerRepairPointMultiplier: number;
    repairKit: RepairKit;
}
export interface RepairKit {
    armor: BonusSettings;
    weapon: BonusSettings;
}
export interface BonusSettings {
    rarityWeight: Record<string, number>;
    bonusTypeWeight: Record<string, number>;
    common: Record<string, BonusValues>;
    rare: Record<string, BonusValues>;
}
export interface BonusValues {
    valuesMinMax: MinMax;
    /** What dura is buff active between (min max of current max) */
    activeDurabilityPercentMinMax: MinMax;
}
