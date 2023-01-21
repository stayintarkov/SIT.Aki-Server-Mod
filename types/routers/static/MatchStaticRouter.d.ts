import { MatchCallbacks } from "../../callbacks/MatchCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class MatchStaticRouter extends StaticRouter {
    protected matchCallbacks: MatchCallbacks;
    constructor(matchCallbacks: MatchCallbacks);
}
