import { NotifierCallbacks } from "../../callbacks/NotifierCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class NotifierStaticRouter extends StaticRouter {
    protected notifierCallbacks: NotifierCallbacks;
    constructor(notifierCallbacks: NotifierCallbacks);
}
