import { ELocationName } from "../../enums/ELocationName";
import { IBaseConfig } from "./IBaseConfig";
export interface IQuestConfig extends IBaseConfig {
    kind: "aki-quest";
    redeemTime: number;
    repeatableQuests: IRepeatableQuestConfig[];
    locationIdMap: Record<string, string>;
    bearOnlyQuests: string[];
    usecOnlyQuests: string[];
}
export interface IRepeatableQuestConfig {
    name: string;
    types: string[];
    resetTime: number;
    numQuests: number;
    minPlayerLevel: number;
    rewardScaling: IRewardScaling;
    locations: Record<ELocationName, string[]>;
    traderWhitelist: ITraderWhitelist[];
    questConfig: IQuestConfig;
    /** Item base types to block when generating rewards */
    rewardBaseTypeBlacklist: string[];
    /** Item tplIds to ignore when generating rewards */
    rewardBlacklist: string[];
}
export interface IRewardScaling {
    levels: number[];
    experience: number[];
    roubles: number[];
    items: number[];
    reputation: number[];
    rewardSpread: number;
}
export interface ITraderWhitelist {
    traderId: string;
    questTypes: string[];
}
export interface IQuestConfig {
    Exploration: IExploration;
    Completion: ICompletion;
    Elimination: IElimination;
}
export interface IExploration {
    maxExtracts: number;
    specificExits: ISpecificExits;
}
export interface ISpecificExits {
    probability: number;
    passageRequirementWhitelist: string[];
}
export interface ICompletion {
    minRequestedAmount: number;
    maxRequestedAmount: number;
    minRequestedBulletAmount: number;
    maxRequestedBulletAmount: number;
    useWhitelist: boolean;
    useBlacklist: boolean;
}
export interface IElimination {
    targets: ITarget[];
    bodyPartProb: number;
    bodyParts: IBodyPart[];
    specificLocationProb: number;
    distLocationBlacklist: string[];
    distProb: number;
    maxDist: number;
    minDist: number;
    maxKills: number;
    minKills: number;
}
export interface IProbabilityObject {
    key: string;
    relativeProbability: number;
    data?: any;
}
export interface ITarget extends IProbabilityObject {
    data: IBossInfo;
}
export interface IBossInfo {
    isBoss: boolean;
}
export interface IBodyPart extends IProbabilityObject {
    data: string[];
}
