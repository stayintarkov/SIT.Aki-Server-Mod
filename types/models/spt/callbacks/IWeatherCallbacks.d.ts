import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
import { IEmptyRequestData } from "../../eft/common/IEmptyRequestData";
export interface IWeatherCallbacks {
    getWeather(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
}
