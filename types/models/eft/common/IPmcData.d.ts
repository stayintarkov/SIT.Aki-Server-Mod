import { IBotBase, IEftStats } from "./tables/IBotBase";
export interface IPmcData extends IBotBase {
}
export interface IPostRaidPmcData extends IBotBase {
    /** Only found in profile we get from client post raid */
    EftStats: IEftStats;
}
