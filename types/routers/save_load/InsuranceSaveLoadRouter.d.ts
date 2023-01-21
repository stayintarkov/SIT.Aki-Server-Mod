import { IAkiProfile } from "../../models/eft/profile/IAkiProfile";
import { HandledRoute, SaveLoadRouter } from "../../di/Router";
export declare class InsuranceSaveLoadRouter extends SaveLoadRouter {
    constructor();
    getHandledRoutes(): HandledRoute[];
    handleLoad(profile: IAkiProfile): IAkiProfile;
}
