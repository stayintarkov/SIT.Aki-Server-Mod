import { ProfileCallbacks } from "../../callbacks/ProfileCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class ProfileStaticRouter extends StaticRouter {
    protected profileCallbacks: ProfileCallbacks;
    constructor(profileCallbacks: ProfileCallbacks);
}
