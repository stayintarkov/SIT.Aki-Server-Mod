import { AvailableForConditions } from "../models/eft/common/tables/IQuest";
export declare class QuestConditionHelper {
    getQuestConditions(q: AvailableForConditions[], furtherFilter?: (a: AvailableForConditions) => AvailableForConditions[]): AvailableForConditions[];
    getLevelConditions(q: AvailableForConditions[], furtherFilter?: (a: AvailableForConditions) => AvailableForConditions[]): AvailableForConditions[];
    getLoyaltyConditions(q: AvailableForConditions[], furtherFilter?: (a: AvailableForConditions) => AvailableForConditions[]): AvailableForConditions[];
    getStandingConditions(q: AvailableForConditions[], furtherFilter?: (a: AvailableForConditions) => AvailableForConditions[]): AvailableForConditions[];
    protected filterConditions(q: AvailableForConditions[], questType: string, furtherFilter?: (a: AvailableForConditions) => AvailableForConditions[]): AvailableForConditions[];
}
