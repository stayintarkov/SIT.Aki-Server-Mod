import { IPmcData } from "../../eft/common/IPmcData";
import { IAcceptQuestRequestData } from "../../eft/quests/IAcceptQuestRequestData";
import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
import { IListQuestsRequestData } from "../../eft/quests/IListQuestsRequestData";
import { IEmptyRequestData } from "../../eft/common/IEmptyRequestData";
import { ICompleteQuestRequestData } from "../../eft/quests/ICompleteQuestRequestData";
import { IHandoverQuestRequestData } from "../../eft/quests/IHandoverQuestRequestData";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
import { IQuest } from "../../eft/common/tables/IQuest";
import { IPmcDataRepeatableQuest } from "../../eft/common/tables/IRepeatableQuests";
import { IRepeatableQuestChangeRequest } from "../../eft/quests/IRepeatableQuestChangeRequest";
export interface IQuestCallbacks {
    changeRepeatableQuest(pmcData: IPmcData, body: IRepeatableQuestChangeRequest, sessionID: string): IItemEventRouterResponse;
    acceptQuest(pmcData: IPmcData, body: IAcceptQuestRequestData, sessionID: string): IItemEventRouterResponse;
    completeQuest(pmcData: IPmcData, body: ICompleteQuestRequestData, sessionID: string): IItemEventRouterResponse;
    handoverQuest(pmcData: IPmcData, body: IHandoverQuestRequestData, sessionID: string): IItemEventRouterResponse;
    listQuests(url: string, info: IListQuestsRequestData, sessionID: string): IGetBodyResponseData<IQuest[]>;
    activityPeriods(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IPmcDataRepeatableQuest[]>;
}
