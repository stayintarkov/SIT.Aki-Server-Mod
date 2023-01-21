import { TraderCallbacks } from "../../callbacks/TraderCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class TraderStaticRouter extends StaticRouter {
    protected traderCallbacks: TraderCallbacks;
    constructor(traderCallbacks: TraderCallbacks);
}
