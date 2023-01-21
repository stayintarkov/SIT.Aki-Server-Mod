import { MatchController } from "../controllers/MatchController";
import { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IGetBodyResponseData } from "../models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "../models/eft/httpResponse/INullResponseData";
import { ICreateGroupRequestData } from "../models/eft/match/ICreateGroupRequestData";
import { IEndOfflineRaidRequestData } from "../models/eft/match/IEndOfflineRaidRequestData";
import { IGetGroupStatusRequestData } from "../models/eft/match/IGetGroupStatusRequestData";
import { IGetProfileRequestData } from "../models/eft/match/IGetProfileRequestData";
import { IJoinMatchRequestData } from "../models/eft/match/IJoinMatchRequestData";
import { IJoinMatchResult } from "../models/eft/match/IJoinMatchResult";
import { IPutMetricsRequestData } from "../models/eft/match/IPutMetricsRequestData";
import { IStartOfflineRaidRequestData } from "../models/eft/match/IStartOffineRaidRequestData";
import { IUpdatePingRequestData } from "../models/eft/match/IUpdatePingRequestData";
import { DatabaseServer } from "../servers/DatabaseServer";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { JsonUtil } from "../utils/JsonUtil";
export declare class MatchCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected matchController: MatchController;
    protected databaseServer: DatabaseServer;
    constructor(httpResponse: HttpResponseUtil, jsonUtil: JsonUtil, matchController: MatchController, databaseServer: DatabaseServer);
    updatePing(url: string, info: IUpdatePingRequestData, sessionID: string): INullResponseData;
    exitMatch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    exitToMenu(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    startGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    stopGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    sendGroupInvite(url: string, info: any, sessionID: string): INullResponseData;
    acceptGroupInvite(url: string, info: any, sessionID: string): INullResponseData;
    cancelGroupInvite(url: string, info: any, sessionID: string): INullResponseData;
    putMetrics(url: string, info: IPutMetricsRequestData, sessionID: string): INullResponseData;
    getProfile(url: string, info: IGetProfileRequestData, sessionID: string): IGetBodyResponseData<IPmcData[]>;
    serverAvailable(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any> | IGetBodyResponseData<true>;
    joinMatch(url: string, info: IJoinMatchRequestData, sessionID: string): IGetBodyResponseData<IJoinMatchResult[]>;
    getMetrics(url: string, info: any, sessionID: string): IGetBodyResponseData<string>;
    /**
     * Handle client/match/group/status
     * @returns
     */
    getGroupStatus(url: string, info: IGetGroupStatusRequestData, sessionID: string): IGetBodyResponseData<any>;
    createGroup(url: string, info: ICreateGroupRequestData, sessionID: string): IGetBodyResponseData<any>;
    deleteGroup(url: string, info: any, sessionID: string): INullResponseData;
    startOfflineRaid(url: string, info: IStartOfflineRaidRequestData, sessionID: string): INullResponseData;
    endOfflineRaid(url: string, info: IEndOfflineRaidRequestData, sessionID: string): INullResponseData;
}
