import { PlayerScavGenerator } from "../generators/PlayerScavGenerator";
import { ItemHelper } from "../helpers/ItemHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IMiniProfile } from "../models/eft/launcher/IMiniProfile";
import { IProfileChangeNicknameRequestData } from "../models/eft/profile/IProfileChangeNicknameRequestData";
import { IProfileChangeVoiceRequestData } from "../models/eft/profile/IProfileChangeVoiceRequestData";
import { IProfileCreateRequestData } from "../models/eft/profile/IProfileCreateRequestData";
import { ISearchFriendRequestData } from "../models/eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "../models/eft/profile/ISearchFriendResponse";
import { IValidateNicknameRequestData } from "../models/eft/profile/IValidateNicknameRequestData";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { ProfileFixerService } from "../services/ProfileFixerService";
import { HashUtil } from "../utils/HashUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class ProfileController {
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected profileFixerService: ProfileFixerService;
    protected playerScavGenerator: PlayerScavGenerator;
    protected traderHelper: TraderHelper;
    protected profileHelper: ProfileHelper;
    constructor(hashUtil: HashUtil, timeUtil: TimeUtil, saveServer: SaveServer, databaseServer: DatabaseServer, itemHelper: ItemHelper, profileFixerService: ProfileFixerService, playerScavGenerator: PlayerScavGenerator, traderHelper: TraderHelper, profileHelper: ProfileHelper);
    getMiniProfiles(): IMiniProfile[];
    getMiniProfile(sessionID: string): any;
    getCompleteProfile(sessionID: string): IPmcData[];
    createProfile(info: IProfileCreateRequestData, sessionID: string): void;
    /**
     * Generate a player scav object
     * pmc profile MUST exist first before pscav can be generated
     * @param sessionID
     * @returns IPmcData object
     */
    generatePlayerScav(sessionID: string): IPmcData;
    validateNickname(info: IValidateNicknameRequestData, sessionID: string): string;
    changeNickname(info: IProfileChangeNicknameRequestData, sessionID: string): string;
    changeVoice(info: IProfileChangeVoiceRequestData, sessionID: string): void;
    getFriends(info: ISearchFriendRequestData, sessionID: string): ISearchFriendResponse[];
}
