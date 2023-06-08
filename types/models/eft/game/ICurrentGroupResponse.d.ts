import { MemberCategory } from "../../../models/enums/MemberCategory";
export interface ICurrentGroupResponse {
    squad: any[];
}
export interface ICurrentGroupSquadMember {
    _id: string;
    aid: string;
    info: ICurrentGroupMemberInfo;
    isLeader: boolean;
    isReady: boolean;
}
export interface ICurrentGroupMemberInfo {
    Nickname: string;
    Side: string;
    Level: string;
    MemberCategory: MemberCategory;
}
