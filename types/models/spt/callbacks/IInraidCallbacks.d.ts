import { INullResponseData } from "../../eft/httpResponse/INullResponseData";
import { IAkiProfile } from "../../eft/profile/IAkiProfile";
import { IEmptyRequestData } from "../../eft/common/IEmptyRequestData";
import { IRegisterPlayerRequestData } from "../../eft/inRaid/IRegisterPlayerRequestData";
import { ISaveProgressRequestData } from "../../eft/inRaid/ISaveProgressRequestData";
export interface IInraidCallbacks {
    onLoad(sessionID: string): IAkiProfile;
    registerPlayer(url: string, info: IRegisterPlayerRequestData, sessionID: string): INullResponseData;
    saveProgress(url: string, info: ISaveProgressRequestData, sessionID: string): INullResponseData;
    getRaidEndState(): string;
    getRaidMenuSettings(url: string, info: IEmptyRequestData, sessionID: string): string;
    getWeaponDurability(url: string, info: any, sessionID: string): string;
    getAirdropConfig(url: string, info: any, sessionID: string): string;
}
