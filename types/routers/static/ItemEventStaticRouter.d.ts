import { ItemEventCallbacks } from "../../callbacks/ItemEventCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class ItemEventStaticRouter extends StaticRouter {
    protected itemEventCallbacks: ItemEventCallbacks;
    constructor(itemEventCallbacks: ItemEventCallbacks);
}
