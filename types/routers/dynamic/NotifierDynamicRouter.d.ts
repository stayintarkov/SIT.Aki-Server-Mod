import { NotifierCallbacks } from "../../callbacks/NotifierCallbacks";
import { DynamicRouter } from "../../di/Router";
export declare class NotifierDynamicRouter extends DynamicRouter {
    protected notifierCallbacks: NotifierCallbacks;
    constructor(notifierCallbacks: NotifierCallbacks);
}
