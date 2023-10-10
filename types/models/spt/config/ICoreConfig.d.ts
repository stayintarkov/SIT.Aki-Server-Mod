import { IBaseConfig } from "./IBaseConfig";
export interface ICoreConfig extends IBaseConfig {
    kind: "aki-core";
    akiVersion: string;
    projectName: string;
    compatibleTarkovVersion: string;
    serverName: string;
    profileSaveIntervalSeconds: number;
    sptFriendNickname: string;
    fixes: IGameFixes;
    features: IServerFeatures;
    /** Commit hash build server was created from */
    commit?: string;
    /** Timestamp of server build */
    buildTime?: string;
}
export interface IGameFixes {
    /** Shotguns use a different value than normal guns causing huge pellet dispersion  */
    fixShotgunDispersion: boolean;
    /** Remove items added by mods when the mod no longer exists - can fix dead profiles stuck at game load*/
    removeModItemsFromProfile: boolean;
}
export interface IServerFeatures {
    autoInstallModDependencies: boolean;
}
