import { MinMax } from "../../../models/common/MinMax";
import { ELocationName } from "../../enums/ELocationName";
import { IBaseConfig } from "./IBaseConfig";
export interface IQuestConfig extends IBaseConfig {
    kind: "aki-quest";
    redeemTime: number;
    questTemplateIds: IPlayerTypeQuestIds;
    repeatableQuests: IRepeatableQuestConfig[];
    locationIdMap: Record<string, string>;
    bearOnlyQuests: string[];
    usecOnlyQuests: string[];
}
export interface IPlayerTypeQuestIds {
    pmc: IQuestTypeIds;
    scav: IQuestTypeIds;
}
export interface IQuestTypeIds {
    Elimination: string;
    Completion: string;
    Exploration: string;
}
export interface IRepeatableQuestConfig {
    name: string;
    side: string;
    types: string[];
    resetTime: number;
    numQuests: number;
    minPlayerLevel: number;
    rewardScaling: IRewardScaling;
    locations: Record<ELocationName, string[]>;
    traderWhitelist: ITraderWhitelist[];
    questConfig: IRepeatableQuestTypesConfig;
    /** Item base types to block when generating rewards */
    rewardBaseTypeBlacklist: string[];
    /** Item tplIds to ignore when generating rewards */
    rewardBlacklist: string[];
    rewardAmmoStackMinSize: number;
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
export interface IRepeatableQuestTypesConfig {
    Exploration: IExploration;
    Completion: ICompletion;
    Elimination: IEliminationConfig[];
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
export interface IEliminationConfig {
    levelRange: MinMax;
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
export interface ITarget extends IProbabilityObject {
    data: IBossInfo;
}
export interface IBossInfo {
    isBoss: boolean;
}
export interface IBodyPart extends IProbabilityObject {
    data: string[];
}
export interface IProbabilityObject {
    key: string;
    relativeProbability: number;
    data?: any;
}
