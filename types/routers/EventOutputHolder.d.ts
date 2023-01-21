import { JsonUtil } from "../utils/JsonUtil";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
export declare class EventOutputHolder {
    protected jsonUtil: JsonUtil;
    protected profileHelper: ProfileHelper;
    constructor(jsonUtil: JsonUtil, profileHelper: ProfileHelper);
    protected output: IItemEventRouterResponse;
    getOutput(sessionID: string): IItemEventRouterResponse;
    resetOutput(sessionID: string): void;
}
