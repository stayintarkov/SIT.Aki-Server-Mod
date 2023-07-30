import { LocationController } from "../controllers/LocationController";
import { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
import { ILocationBase } from "../models/eft/common/ILocationBase";
import { ILocationsGenerateAllResponse } from "../models/eft/common/ILocationsSourceDestinationBase";
import { IGetBodyResponseData } from "../models/eft/httpResponse/IGetBodyResponseData";
import { IGetLocationRequestData } from "../models/eft/location/IGetLocationRequestData";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
export declare class LocationCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected locationController: LocationController;
    constructor(httpResponse: HttpResponseUtil, locationController: LocationController);
    /** Handle client/locations */
    getLocationData(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ILocationsGenerateAllResponse>;
    /** Handle client/location/getLocalloot */
    getLocation(url: string, info: IGetLocationRequestData, sessionID: string): IGetBodyResponseData<ILocationBase>;
    /** Handle client/location/getAirdropLoot */
    getAirdropLoot(url: string, info: IEmptyRequestData, sessionID: string): string;
}
