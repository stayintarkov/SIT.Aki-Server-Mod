import { IPmcData } from "../../eft/common/IPmcData";
import { IAkiProfile } from "../../eft/profile/IAkiProfile";
import { ISyncHealthRequestData } from "../../eft/health/ISyncHealthRequestData";
import { IOffraidEatRequestData } from "../../eft/health/IOffraidEatRequestData";
import { IOffraidHealRequestData } from "../../eft/health/IOffraidHealRequestData";
import { IHealthTreatmentRequestData } from "../../eft/health/IHealthTreatmentRequestData";
export interface IHealthCallbacks {
    onLoad(sessionID: string): IAkiProfile;
    syncHealth(url: string, info: ISyncHealthRequestData, sessionID: string): any;
    offraidEat(pmcData: IPmcData, body: IOffraidEatRequestData, sessionID: string): any;
    offraidHeal(pmcData: IPmcData, body: IOffraidHealRequestData, sessionID: string): any;
    healthTreatment(pmcData: IPmcData, info: IHealthTreatmentRequestData, sessionID: string): any;
}
