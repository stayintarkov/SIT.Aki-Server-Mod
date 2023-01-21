import { IEmptyRequestData } from "../../eft/common/IEmptyRequestData";
import { IBarterScheme, ITraderAssort, ITraderBase } from "../../eft/common/tables/ITrader";
import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
export interface ITraderCallbacks {
    load(): void;
    getTraderSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderBase[]>;
    getProfilePurchases(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<Record<string, IBarterScheme[][]>>;
    getTrader(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderBase>;
    getAssort(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ITraderAssort>;
    update(): boolean;
}
