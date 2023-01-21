import { IBaseConfig } from "./IBaseConfig";
export interface ICoreConfig extends IBaseConfig {
    kind: "aki-core";
    akiVersion: string;
    projectName: string;
    compatibleTarkovVersion: string;
}
