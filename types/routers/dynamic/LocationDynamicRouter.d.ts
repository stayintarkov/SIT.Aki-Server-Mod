import { LocationCallbacks } from "../../callbacks/LocationCallbacks";
import { DynamicRouter } from "../../di/Router";
export declare class LocationDynamicRouter extends DynamicRouter {
    protected locationCallbacks: LocationCallbacks;
    constructor(locationCallbacks: LocationCallbacks);
    getTopLevelRoute(): string;
}
