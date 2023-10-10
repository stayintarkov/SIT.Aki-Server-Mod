import { MinMax } from "../../common/MinMax";
import { IBaseConfig } from "./IBaseConfig";
export interface IScavCaseConfig extends IBaseConfig {
    kind: "aki-scavcase";
    rewardItemValueRangeRub: Record<string, MinMax>;
    moneyRewards: MoneyRewards;
    ammoRewards: AmmoRewards;
    rewardItemParentBlacklist: string[];
    rewardItemBlacklist: string[];
    allowMultipleMoneyRewardsPerRarity: boolean;
    allowMultipleAmmoRewardsPerRarity: boolean;
}
export interface MoneyRewards {
    moneyRewardChancePercent: number;
    rubCount: MoneyLevels;
    usdCount: MoneyLevels;
    eurCount: MoneyLevels;
}
export interface MoneyLevels {
    common: MinMax;
    rare: MinMax;
    superrare: MinMax;
}
export interface AmmoRewards {
    ammoRewardChancePercent: number;
    ammoRewardBlacklist: Record<string, string[]>;
    ammoRewardValueRangeRub: Record<string, MinMax>;
    minStackSize: number;
}
