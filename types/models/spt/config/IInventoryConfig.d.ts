import { IBaseConfig } from "./IBaseConfig";
export interface IInventoryConfig extends IBaseConfig {
    kind: "aki-inventory";
    newItemsMarkedFound: boolean;
    randomLootContainers: Record<string, RewardDetails>;
}
export interface RewardDetails {
    rewardCount: number;
    foundInRaid: boolean;
    rewardTplPool: Record<string, number>;
}
