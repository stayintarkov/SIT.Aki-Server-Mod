import { IGenerateBotsRequestData } from "../../eft/bot/IGenerateBotsRequestData";
import { IEmptyRequestData } from "../../eft/common/IEmptyRequestData";
import { IBotBase } from "../../eft/common/tables/IBotBase";
import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
export interface IBotCallbacks {
    getBotLimit(url: string, info: IEmptyRequestData, sessionID: string): string;
    getBotDifficulty(url: string, info: IEmptyRequestData, sessionID: string): string;
    generateBots(url: string, info: IGenerateBotsRequestData, sessionID: string): IGetBodyResponseData<IBotBase[]>;
    getBotCap(): string;
}
