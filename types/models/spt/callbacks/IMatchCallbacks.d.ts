import { IStartOfflineRaidRequestData } from "../../eft/match/IStartOffineRaidRequestData";
import { IEndOfflineRaidRequestData } from "../../eft/match/IEndOfflineRaidRequestData";
import { INullResponseData } from "../../eft/httpResponse/INullResponseData";
import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
import { IPmcData } from "../../eft/common/IPmcData";
export interface IMatchCallbacks {
    updatePing(url: string, info: any, sessionID: string): INullResponseData;
    exitMatch(url: string, info: any, sessionID: string): INullResponseData;
    exitToMenu(url: string, info: any, sessionID: string): INullResponseData;
    startGroupSearch(url: string, info: any, sessionID: string): INullResponseData;
    stopGroupSearch(url: string, info: any, sessionID: string): INullResponseData;
    sendGroupInvite(url: string, info: any, sessionID: string): INullResponseData;
    acceptGroupInvite(url: string, info: any, sessionID: string): INullResponseData;
    cancelGroupInvite(url: string, info: any, sessionID: string): INullResponseData;
    putMetrics(url: string, info: any, sessionID: string): INullResponseData;
    getProfile(url: string, info: any, sessionID: string): IGetBodyResponseData<IPmcData[]>;
    serverAvailable(url: string, info: any, sessionID: string): IGetBodyResponseData<any> | IGetBodyResponseData<true>;
    joinMatch(url: string, info: any, sessionID: string): IGetBodyResponseData<any>;
    getMetrics(url: string, info: any, sessionID: string): IGetBodyResponseData<string>;
    getGroupStatus(url: string, info: any, sessionID: string): IGetBodyResponseData<any>;
    createGroup(url: string, info: any, sessionID: string): IGetBodyResponseData<any>;
    deleteGroup(url: string, info: any, sessionID: string): INullResponseData;
    startOfflineRaid(url: string, info: IStartOfflineRaidRequestData, sessionID: string): INullResponseData;
    endOfflineRaid(url: string, info: IEndOfflineRaidRequestData, sessionID: string): INullResponseData;
}
