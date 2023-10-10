import { QuestRewardType } from "../../../enums/QuestRewardType";
import { QuestStatus } from "../../../enums/QuestStatus";
import { QuestTypeEnum } from "../../../enums/QuestTypeEnum";
import { Item } from "./IItem";
export interface IQuest {
    /** SPT addition - human readable quest name */
    QuestName?: string;
    _id: string;
    canShowNotificationsInGame: boolean;
    conditions: Conditions;
    description: string;
    failMessageText: string;
    name: string;
    note: string;
    traderId: string;
    location: string;
    image: string;
    type: QuestTypeEnum;
    isKey: boolean;
    /** @deprecated - Likely not used, use 'status' instead */
    questStatus: QuestStatus;
    restartable: boolean;
    instantComplete: boolean;
    secretQuest: boolean;
    startedMessageText: string;
    successMessageText: string;
    templateId: string;
    rewards: Rewards;
    /** Becomes 'AppearStatus' inside client */
    status: string | number;
    KeyQuest: boolean;
    changeQuestMessageText: string;
    /** "Pmc" or "Scav" */
    side: string;
    /** Status of quest to player */
    sptStatus?: QuestStatus;
}
export interface Conditions {
    Started: AvailableForConditions[];
    AvailableForFinish: AvailableForConditions[];
    AvailableForStart: AvailableForConditions[];
    Success: AvailableForConditions[];
    Fail: AvailableForConditions[];
}
export interface AvailableForConditions {
    _parent: string;
    _props: AvailableForProps;
    dynamicLocale?: boolean;
}
export interface AvailableForProps {
    id: string;
    index: number;
    parentId: string;
    isEncoded: boolean;
    dynamicLocale: boolean;
    value?: string | number;
    compareMethod?: string;
    visibilityConditions?: VisibilityCondition[];
    target?: string | string[];
    status?: QuestStatus[];
    availableAfter?: number;
    dispersion?: number;
    onlyFoundInRaid?: boolean;
    oneSessionOnly?: boolean;
    doNotResetIfCounterCompleted?: boolean;
    dogtagLevel?: number;
    maxDurability?: number;
    minDurability?: number;
    counter?: AvailableForCounter;
    plantTime?: number;
    zoneId?: string;
    type?: boolean;
    countInRaid?: boolean;
    globalQuestCounterId?: any;
}
export interface AvailableForCounter {
    id: string;
    conditions: CounterCondition[];
}
export interface CounterCondition {
    _parent: string;
    _props: CounterProps;
}
export interface CounterProps {
    id: string;
    target: string[] | string;
    compareMethod?: string;
    value?: string;
    weapon?: string[];
    equipmentInclusive?: string[][];
    weaponModsInclusive?: string[][];
    status?: string[];
    bodyPart?: string[];
    daytime?: DaytimeCounter;
}
export interface DaytimeCounter {
    from: number;
    to: number;
}
export interface VisibilityCondition {
    id: string;
    value: number;
    dynamicLocale: boolean;
    oneSessionOnly: boolean;
}
export interface Rewards {
    AvailableForStart: Reward[];
    AvailableForFinish: Reward[];
    Started: Reward[];
    Success: Reward[];
    Fail: Reward[];
    FailRestartable: Reward[];
    Expired: Reward[];
}
export interface Reward extends Item {
    value?: string | number;
    id: string;
    type: QuestRewardType;
    index: number;
    target?: string;
    items?: Item[];
    loyaltyLevel?: number;
    traderId?: string;
    unknown?: boolean;
    findInRaid?: boolean;
}
