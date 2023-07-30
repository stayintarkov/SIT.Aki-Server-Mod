import { IBaseConfig } from "./IBaseConfig";
export interface IInRaidConfig extends IBaseConfig {
    kind: "aki-inraid";
    MIAOnRaidEnd: boolean;
    /** Overrides to apply to the pre-raid settings screen */
    raidMenuSettings: RaidMenuSettings;
    /** What effects should be saved post-raid */
    save: Save;
    /** Names of car extracts */
    carExtracts: string[];
    /** Fene rep gain from a single car extract */
    carExtractBaseStandingGain: number;
    /** Fence rep gain when successfully extracting as pscav */
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
    /** Should loot gained from raid be saved */
    loot: boolean;
    durability: boolean;
}
