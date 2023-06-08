import { HandledRoute, SaveLoadRouter } from "../../di/Router";
import { IAkiProfile } from "../../models/eft/profile/IAkiProfile";
export declare class InraidSaveLoadRouter extends SaveLoadRouter {
    constructor();
    getHandledRoutes(): HandledRoute[];
    handleLoad(profile: IAkiProfile): IAkiProfile;
}
