import { MinMax } from "../../../models/common/MinMax";
import { IBaseConfig } from "./IBaseConfig";
export interface ITraderConfig extends IBaseConfig {
    kind: "aki-trader";
    updateTime: UpdateTime[];
    updateTimeDefault: number;
    /** What % of max durability an item needs to sell to a trader*/
    durabilityPurchaseThreshhold: Record<string, number>;
    traderPriceMultipler: number;
    persistPurchaseDataInProfile: boolean;
    fence: FenceConfig;
}
export interface UpdateTime {
    traderId: string;
    seconds: number;
}
export interface FenceConfig {
    partialRefreshTimeSeconds: number;
    partialRefreshChangePercent: number;
    assortSize: number;
    maxPresetsPercent: number;
    presetPriceMult: number;
    armorMaxDurabilityPercentMinMax: MinMax;
    presetMaxDurabilityPercentMinMax: MinMax;
    itemPriceMult: number;
    regenerateAssortsOnRefresh: boolean;
    itemTypeLimits: Record<string, number>;
    blacklist: string[];
}
