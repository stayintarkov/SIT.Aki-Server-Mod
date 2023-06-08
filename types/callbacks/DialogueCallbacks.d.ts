import { DialogueController } from "../controllers/DialogueController";
import { OnUpdate } from "../di/OnUpdate";
import { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
import { IAcceptFriendRequestData } from "../models/eft/dialog/IAcceptFriendRequestData";
import { IChatServer } from "../models/eft/dialog/IChatServer";
import { IClearMailMessageRequest } from "../models/eft/dialog/IClearMailMessageRequest";
import { IDeleteFriendRequest } from "../models/eft/dialog/IDeleteFriendRequest";
import { IFriendRequestData } from "../models/eft/dialog/IFriendRequestData";
import { IFriendRequestSendResponse } from "../models/eft/dialog/IFriendRequestSendResponse";
import { IGetAllAttachmentsRequestData } from "../models/eft/dialog/IGetAllAttachmentsRequestData";
import { IGetAllAttachmentsResponse } from "../models/eft/dialog/IGetAllAttachmentsResponse";
import { IGetChatServerListRequestData } from "../models/eft/dialog/IGetChatServerListRequestData";
import { IGetFriendListDataResponse } from "../models/eft/dialog/IGetFriendListDataResponse";
import { IGetMailDialogInfoRequestData } from "../models/eft/dialog/IGetMailDialogInfoRequestData";
import { IGetMailDialogListRequestData } from "../models/eft/dialog/IGetMailDialogListRequestData";
import { IGetMailDialogViewRequestData } from "../models/eft/dialog/IGetMailDialogViewRequestData";
import { IGetMailDialogViewResponseData } from "../models/eft/dialog/IGetMailDialogViewResponseData";
import { IPinDialogRequestData } from "../models/eft/dialog/IPinDialogRequestData";
import { IRemoveDialogRequestData } from "../models/eft/dialog/IRemoveDialogRequestData";
import { IRemoveMailMessageRequest } from "../models/eft/dialog/IRemoveMailMessageRequest";
import { ISendMessageRequest } from "../models/eft/dialog/ISendMessageRequest";
import { ISetDialogReadRequestData } from "../models/eft/dialog/ISetDialogReadRequestData";
import { IGetBodyResponseData } from "../models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "../models/eft/httpResponse/INullResponseData";
import { DialogueInfo } from "../models/eft/profile/IAkiProfile";
import { HashUtil } from "../utils/HashUtil";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class DialogueCallbacks implements OnUpdate {
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected httpResponse: HttpResponseUtil;
    protected dialogueController: DialogueController;
    constructor(hashUtil: HashUtil, timeUtil: TimeUtil, httpResponse: HttpResponseUtil, dialogueController: DialogueController);
    /**
     * Handles client/friend/list
     * @returns IGetFriendListDataResponse
     */
    getFriendList(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGetFriendListDataResponse>;
    /**
     * Handles client/chatServer/list
     * @returns
     */
    getChatServerList(url: string, info: IGetChatServerListRequestData, sessionID: string): IGetBodyResponseData<IChatServer[]>;
    /** Handle client/mail/dialog/list */
    getMailDialogList(url: string, info: IGetMailDialogListRequestData, sessionID: string): IGetBodyResponseData<DialogueInfo[]>;
    /** Handle client/mail/dialog/view */
    getMailDialogView(url: string, info: IGetMailDialogViewRequestData, sessionID: string): IGetBodyResponseData<IGetMailDialogViewResponseData>;
    /** Handle client/mail/dialog/info */
    getMailDialogInfo(url: string, info: IGetMailDialogInfoRequestData, sessionID: string): IGetBodyResponseData<DialogueInfo>;
    /** Handle client/mail/dialog/remove */
    removeDialog(url: string, info: IRemoveDialogRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    pinDialog(url: string, info: IPinDialogRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    unpinDialog(url: string, info: IPinDialogRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    setRead(url: string, info: ISetDialogReadRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    /**
     * Handles client/mail/dialog/getAllAttachments
     * @returns IGetAllAttachmentsResponse
     */
    getAllAttachments(url: string, info: IGetAllAttachmentsRequestData, sessionID: string): IGetBodyResponseData<IGetAllAttachmentsResponse>;
    /** Handle client/friend/request/list/outbox */
    listOutbox(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    listInbox(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any[]>;
    sendFriendRequest(url: string, request: IFriendRequestData, sessionID: string): IGetBodyResponseData<IFriendRequestSendResponse>;
    acceptFriendRequest(url: string, request: IAcceptFriendRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    deleteFriend(url: string, request: IDeleteFriendRequest, sessionID: string): INullResponseData;
    sendMessage(url: string, request: ISendMessageRequest, sessionID: string): IGetBodyResponseData<number>;
    clearMail(url: string, request: IClearMailMessageRequest, sessionID: string): IGetBodyResponseData<any[]>;
    removeMail(url: string, request: IRemoveMailMessageRequest, sessionID: string): IGetBodyResponseData<any[]>;
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
