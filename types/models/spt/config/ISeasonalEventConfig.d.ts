import { IBaseConfig } from "./IBaseConfig";
export interface ISeasonalEventConfig extends IBaseConfig {
    kind: "aki-seasonalevents";
    enableSeasonalEventDetection: boolean;
    /** event / botType / equipSlot / itemid */
    eventGear: Record<string, Record<string, Record<string, Record<string, number>>>>;
    events: ISeasonalEvent[];
}
export interface ISeasonalEvent {
    name: string;
    startDay: number;
    startMonth: number;
    endDay: number;
    endMonth: number;
}
