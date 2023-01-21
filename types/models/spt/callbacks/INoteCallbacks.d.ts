import { IPmcData } from "../../eft/common/IPmcData";
import { INoteActionData } from "../../eft/notes/INoteActionData";
import { IItemEventRouterResponse } from "../../eft/itemEvent/IItemEventRouterResponse";
export interface INoteCallbacks {
    addNote(pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
    editNote(pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
    deleteNote(pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
}
