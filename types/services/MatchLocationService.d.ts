import { ICreateGroupRequestData } from "../models/eft/match/ICreateGroupRequestData";
import { TimeUtil } from "../utils/TimeUtil";
export declare class MatchLocationService {
    protected timeUtil: TimeUtil;
    protected locations: {};
    constructor(timeUtil: TimeUtil);
    createGroup(sessionID: string, info: ICreateGroupRequestData): any;
    deleteGroup(info: any): void;
}
