import { IBaseConfig } from "./IBaseConfig";
export interface IInRaidConfig extends IBaseConfig {
    kind: "aki-inraid";
    MIAOnRaidEnd: boolean;
    raidMenuSettings: RaidMenuSettings;
    save: Save;
    carExtracts: string[];
    carExtractBaseStandingGain: number;
    scavExtractGain: number;
}
export interface RaidMenuSettings {
    aiAmount: string;
    aiDifficulty: string;
    bossEnabled: boolean;
    scavWars: boolean;
    taggedAndCursed: boolean;
    enablePve: boolean;
}
export interface Save {
    loot: boolean;
    durability: boolean;
}
