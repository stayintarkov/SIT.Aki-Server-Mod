import { InraidCallbacks } from "../../callbacks/InraidCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class InraidStaticRouter extends StaticRouter {
    protected inraidCallbacks: InraidCallbacks;
    constructor(inraidCallbacks: InraidCallbacks);
}
