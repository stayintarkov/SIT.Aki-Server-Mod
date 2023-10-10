import { PlayerRaidEndState } from "../../../models/enums/PlayerRaidEndState";
import { IPostRaidPmcData } from "../common/IPmcData";
import { ISyncHealthRequestData } from "../health/ISyncHealthRequestData";
import { IInsuredItemsData } from "./IInsuredItemsData";
export interface ISaveProgressRequestData {
    exit: PlayerRaidEndState;
    profile: IPostRaidPmcData;
    isPlayerScav: boolean;
    health: ISyncHealthRequestData;
    insurance: IInsuredItemsData[];
}
