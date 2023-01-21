import { IBaseConfig } from "./IBaseConfig";
export interface IMatchConfig extends IBaseConfig {
    kind: "aki-match";
    enabled: boolean;
}
