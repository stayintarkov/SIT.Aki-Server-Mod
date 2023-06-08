import { MinMax } from "../../../models/common/MinMax";
import { IBaseConfig } from "./IBaseConfig";
export interface ITraderConfig extends IBaseConfig {
    kind: "aki-trader";
    updateTime: UpdateTime[];
    purchasesAreFoundInRaid: boolean;
    updateTimeDefault: number;
    traderPriceMultipler: number;
    persistPurchaseDataInProfile: boolean;
    fence: FenceConfig;
}
export interface UpdateTime {
    traderId: string;
    seconds: number;
}
export interface FenceConfig {
    discountOptions: DiscountOptions;
    partialRefreshTimeSeconds: number;
    partialRefreshChangePercent: number;
    assortSize: number;
    maxPresetsPercent: number;
    itemPriceMult: number;
    presetPriceMult: number;
    armorMaxDurabilityPercentMinMax: MinMax;
    presetMaxDurabilityPercentMinMax: MinMax;
    itemTypeLimits: Record<string, number>;
    regenerateAssortsOnRefresh: boolean;
    blacklist: string[];
}
export interface DiscountOptions {
    assortSize: number;
    itemPriceMult: number;
    presetPriceMult: number;
}
