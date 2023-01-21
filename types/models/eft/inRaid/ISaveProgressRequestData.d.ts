import { IPmcData } from "../common/IPmcData";
import { ISyncHealthRequestData } from "../health/ISyncHealthRequestData";
export interface ISaveProgressRequestData {
    exit: string;
    profile: IPmcData;
    isPlayerScav: boolean;
    health: ISyncHealthRequestData;
}
