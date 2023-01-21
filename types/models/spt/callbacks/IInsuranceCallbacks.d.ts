import { IPmcData } from "../../eft/common/IPmcData";
import { IAkiProfile } from "../../eft/profile/IAkiProfile";
import { IGetInsuranceCostRequestData } from "../../eft/insurance/IGetInsuranceCostRequestData";
import { IInsureRequestData } from "../../eft/insurance/IInsureRequestData";
export interface IInsuranceCallbacks {
    onLoad(sessionID: string): IAkiProfile;
    getInsuranceCost(url: string, info: IGetInsuranceCostRequestData, sessionID: string): any;
    insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string): any;
    update(secondsSinceLastRun: number): boolean;
}
