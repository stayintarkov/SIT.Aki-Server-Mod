import { BotCallbacks } from "../../callbacks/BotCallbacks";
import { DynamicRouter } from "../../di/Router";
export declare class BotDynamicRouter extends DynamicRouter {
    protected botCallbacks: BotCallbacks;
    constructor(botCallbacks: BotCallbacks);
}
