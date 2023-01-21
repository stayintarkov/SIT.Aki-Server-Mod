import { IBaseConfig } from "./IBaseConfig";
export interface IItemConfig extends IBaseConfig {
    kind: "aki-item";
    blacklist: string[];
}
