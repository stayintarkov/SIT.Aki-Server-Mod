import { LauncherCallbacks } from "../../callbacks/LauncherCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class LauncherStaticRouter extends StaticRouter {
    protected launcherCallbacks: LauncherCallbacks;
    constructor(launcherCallbacks: LauncherCallbacks);
}
