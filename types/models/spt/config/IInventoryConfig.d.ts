import { IBaseConfig } from "./IBaseConfig";
export interface IInventoryConfig extends IBaseConfig {
    kind: "aki-inventory";
    newItemsMarkedFound: boolean;
    randomLootContainers: Record<string, RewardDetails>;
    /** Contains item tpls that the server should consider money and treat the same as roubles/euros/dollars */
    customMoneyTpls: string[];
}
export interface RewardDetails {
    rewardCount: number;
    foundInRaid: boolean;
    rewardTplPool: Record<string, number>;
}
