import { BotCallbacks } from "../../callbacks/BotCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class BotStaticRouter extends StaticRouter {
    protected botCallbacks: BotCallbacks;
    constructor(botCallbacks: BotCallbacks);
}
