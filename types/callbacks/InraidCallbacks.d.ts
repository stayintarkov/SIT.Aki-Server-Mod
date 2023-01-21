import { InraidController } from "../controllers/InraidController";
import { INullResponseData } from "../models/eft/httpResponse/INullResponseData";
import { IRegisterPlayerRequestData } from "../models/eft/inRaid/IRegisterPlayerRequestData";
import { ISaveProgressRequestData } from "../models/eft/inRaid/ISaveProgressRequestData";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
/**
 * Handle client requests
 */
export declare class InraidCallbacks {
    protected inraidController: InraidController;
    protected httpResponse: HttpResponseUtil;
    constructor(inraidController: InraidController, httpResponse: HttpResponseUtil);
    /**
     * Handle client/location/getLocalloot
     * @param url
     * @param info register player request
     * @param sessionID Session id
     * @returns Null http response
     */
    registerPlayer(url: string, info: IRegisterPlayerRequestData, sessionID: string): INullResponseData;
    /**
     * Handle raid/profile/save
     * @param url
     * @param info Save progress request
     * @param sessionID Session id
     * @returns Null http response
     */
    saveProgress(url: string, info: ISaveProgressRequestData, sessionID: string): INullResponseData;
    /**
     * Handle singleplayer/settings/raid/endstate
     * @returns
     */
    getRaidEndState(): string;
    /**
     * Handle singleplayer/settings/raid/menu
     * @returns JSON as string
     */
    getRaidMenuSettings(): string;
    /**
     * Handle singleplayer/settings/weapon/durability
     * @returns
     */
    getWeaponDurability(): string;
    /**
     * Handle singleplayer/airdrop/config
     * @returns JSON as string
     */
    getAirdropConfig(): string;
}
