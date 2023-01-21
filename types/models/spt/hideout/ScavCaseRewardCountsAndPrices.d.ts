export interface ScavCaseRewardCountsAndPrices {
    common: RewardCountAndPriceDetails;
    rare: RewardCountAndPriceDetails;
    superrare: RewardCountAndPriceDetails;
}
export interface RewardCountAndPriceDetails {
    minCount: number;
    maxCount: number;
    minPriceRub: number;
    maxPriceRub: number;
}
