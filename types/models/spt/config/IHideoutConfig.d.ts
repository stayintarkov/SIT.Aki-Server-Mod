import { IBaseConfig } from "./IBaseConfig";
export interface IHideoutConfig extends IBaseConfig {
    kind: "aki-hideout";
    runIntervalSeconds: number;
    hoursForSkillCrafting: number;
    generatorSpeedWithoutFuel: number;
    generatorFuelFlowRate: number;
    airFilterUnitFlowRate: number;
    /** SEE HIDEOUTHELPER BEFORE CHANGING CONFIG */
    gpuBoostRate: number;
}
