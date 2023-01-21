import { IGetLocationRequestData } from "../../eft/location/IGetLocationRequestData";
import { IGetBodyResponseData } from "../../eft/httpResponse/IGetBodyResponseData";
import { ILocationsGenerateAllResponse } from "../../eft/common/ILocationsSourceDestinationBase";
import { ILocationBase } from "../../eft/common/ILocationBase";
export interface ILocationCallbacks {
    getLocationData(url: string, info: any, sessionID: string): IGetBodyResponseData<ILocationsGenerateAllResponse>;
    getLocation(url: string, info: IGetLocationRequestData, sessionID: string): IGetBodyResponseData<ILocationBase>;
}
