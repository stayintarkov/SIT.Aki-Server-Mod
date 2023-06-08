import { IBaseConfig } from "./IBaseConfig";
export interface ISeasonalEventConfig extends IBaseConfig {
    kind: "aki-seasonalevents";
    enableSeasonalEventDetection: boolean;
    /** event / botType / equipSlot / itemid */
    eventGear: Record<string, Record<string, Record<string, Record<string, number>>>>;
    events: ISeasonalEvent[];
    gifterSettings: GifterSetting[];
}
export interface ISeasonalEvent {
    name: string;
    startDay: number;
    startMonth: number;
    endDay: number;
    endMonth: number;
}
export interface GifterSetting {
    map: string;
    zones: string;
    spawnChance: number;
}
