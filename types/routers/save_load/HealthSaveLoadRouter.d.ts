import { HandledRoute, SaveLoadRouter } from "../../di/Router";
import { IAkiProfile } from "../../models/eft/profile/IAkiProfile";
export declare class HealthSaveLoadRouter extends SaveLoadRouter {
    constructor();
    getHandledRoutes(): HandledRoute[];
    handleLoad(profile: IAkiProfile): IAkiProfile;
}
