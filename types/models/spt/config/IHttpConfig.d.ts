import { IBaseConfig } from "./IBaseConfig";
export interface IHttpConfig extends IBaseConfig {
    webSocketPingDelayMs: number;
    kind: "aki-http";
    ip: string;
    port: number;
}
