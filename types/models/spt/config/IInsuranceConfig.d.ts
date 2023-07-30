import { IBaseConfig } from "./IBaseConfig";
export interface IInsuranceConfig extends IBaseConfig {
    kind: "aki-insurance";
    /** Insurance price multiplier */
    insuranceMultiplier: Record<string, number>;
    /** Chance item is returned as insurance, keyed by trader id */
    returnChancePercent: Record<string, number>;
    /** Item slots that should never be returned as insurance */
    blacklistedEquipment: string[];
    /** Names of equipment slots that could not be returned as insurance */
    slotIdsWithChanceOfNotReturning: string[];
    /** Override to control how quickly insurance is processed/returned in second */
    returnTimeOverrideSeconds: number;
    /** How often server should process insurance in seconds */
    runIntervalSeconds: number;
}
