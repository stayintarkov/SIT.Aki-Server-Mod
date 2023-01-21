import { GameController } from "../controllers/GameController";
import { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
import { ICheckVersionResponse } from "../models/eft/game/ICheckVersionResponse";
import { IGameConfigResponse } from "../models/eft/game/IGameConfigResponse";
import { IGameEmptyCrcRequestData } from "../models/eft/game/IGameEmptyCrcRequestData";
import { IGameKeepAliveResponse } from "../models/eft/game/IGameKeepAliveResponse";
import { IGameLogoutResponseData } from "../models/eft/game/IGameLogoutResponseData";
import { IGameStartResponse } from "../models/eft/game/IGameStartResponse";
import { IReportNicknameRequestData } from "../models/eft/game/IReportNicknameRequestData";
import { IServerDetails } from "../models/eft/game/IServerDetails";
import { IVersionValidateRequestData } from "../models/eft/game/IVersionValidateRequestData";
import { IGetBodyResponseData } from "../models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "../models/eft/httpResponse/INullResponseData";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { Watermark } from "../utils/Watermark";
declare class GameCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected watermark: Watermark;
    protected gameController: GameController;
    constructor(httpResponse: HttpResponseUtil, watermark: Watermark, gameController: GameController);
    /**
     * Handle client/game/version/validate
     * @returns INullResponseData
     */
    versionValidate(url: string, info: IVersionValidateRequestData, sessionID: string): INullResponseData;
    /**
     * Handle client/game/start
     * @returns IGameStartResponse
     */
    gameStart(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGameStartResponse>;
    /**
     * Handle client/game/logout
     * @returns IGameLogoutResponseData
     */
    gameLogout(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGameLogoutResponseData>;
    /**
     * Handle client/game/config
     * @returns IGameConfigResponse
     */
    getGameConfig(url: string, info: IGameEmptyCrcRequestData, sessionID: string): IGetBodyResponseData<IGameConfigResponse>;
    getServer(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IServerDetails[]>;
    validateGameVersion(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ICheckVersionResponse>;
    /**
     * Handle client/game/keepalive
     * @returns IGameKeepAliveResponse
     */
    gameKeepalive(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGameKeepAliveResponse>;
    /**
     * Handle singleplayer/settings/version
     * @returns string
     */
    getVersion(url: string, info: IEmptyRequestData, sessionID: string): string;
    reportNickname(url: string, info: IReportNicknameRequestData, sessionID: string): INullResponseData;
}
export { GameCallbacks };
