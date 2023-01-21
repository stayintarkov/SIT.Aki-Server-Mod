import { IEmptyRequestData } from "../../eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "../../eft/httpResponse/INullResponseData";
import { IProfileChangeNicknameRequestData } from "../../eft/profile/IProfileChangeNicknameRequestData";
import { IProfileChangeVoiceRequestData } from "../../eft/profile/IProfileChangeVoiceRequestData";
import { IProfileCreateRequestData } from "../../eft/profile/IProfileCreateRequestData";
import { IValidateNicknameRequestData } from "../../eft/profile/IValidateNicknameRequestData";
import { ISearchFriendRequestData } from "../../eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "../../eft/profile/ISearchFriendResponse";
export interface IProfileCallbacks {
    onLoad(sessionID: string): any;
    createProfile(url: string, info: IProfileCreateRequestData, sessionID: string): IGetBodyResponseData<any>;
    getProfileData(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    regenerateScav(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    changeVoice(url: string, info: IProfileChangeVoiceRequestData, sessionID: string): INullResponseData;
    changeNickname(url: string, info: IProfileChangeNicknameRequestData, sessionID: string): IGetBodyResponseData<any>;
    validateNickname(url: string, info: IValidateNicknameRequestData, sessionID: string): IGetBodyResponseData<any>;
    getReservedNickname(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<string>;
    getProfileStatus(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    searchFriend(url: string, info: ISearchFriendRequestData, sessionID: string): IGetBodyResponseData<ISearchFriendResponse>;
}
