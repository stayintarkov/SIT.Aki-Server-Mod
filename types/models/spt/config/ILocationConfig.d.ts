import { BossLocationSpawn, Wave } from "../../../models/eft/common/ILocationBase";
import { IBaseConfig } from "./IBaseConfig";
export interface ILocationConfig extends IBaseConfig {
    kind: "aki-location";
    fixEmptyBotWavesSettings: IFixEmptyBotWavesSettings;
    rogueLighthouseSpawnTimeSettings: IRogueLighthouseSpawnTimeSettings;
    splitWaveIntoSingleSpawnsSettings: ISplitWaveSettings;
    looseLootMultiplier: LootMultiplier;
    staticLootMultiplier: LootMultiplier;
    customWaves: CustomWaves;
    /** Open zones to add to map */
    openZones: Record<string, string[]>;
    /** Key = map id, value = item tpls that should only have one forced loot spawn position */
    forcedLootSingleSpawnById: Record<string, string[]>;
    /** How many attempts should be taken to fit an item into a container before giving up */
    fitLootIntoContainerAttempts: number;
}
export interface IFixEmptyBotWavesSettings {
    enabled: boolean;
    ignoreMaps: string[];
}
export interface IRogueLighthouseSpawnTimeSettings {
    enabled: boolean;
    waitTimeSeconds: number;
}
export interface ISplitWaveSettings {
    enabled: boolean;
    ignoreMaps: string[];
    waveSizeThreshold: number;
}
export interface CustomWaves {
    boss: Record<string, BossLocationSpawn[]>;
    normal: Record<string, Wave[]>;
}
export interface LootMultiplier {
    bigmap: number;
    develop: number;
    factory4_day: number;
    factory4_night: number;
    interchange: number;
    laboratory: number;
    rezervbase: number;
    shoreline: number;
    woods: number;
    hideout: number;
    lighthouse: number;
    privatearea: number;
    suburbs: number;
    tarkovstreets: number;
    terminal: number;
    town: number;
}
