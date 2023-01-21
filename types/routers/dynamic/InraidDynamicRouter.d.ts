import { InraidCallbacks } from "../../callbacks/InraidCallbacks";
import { DynamicRouter } from "../../di/Router";
export declare class InraidDynamicRouter extends DynamicRouter {
    protected inraidCallbacks: InraidCallbacks;
    constructor(inraidCallbacks: InraidCallbacks);
    getTopLevelRoute(): string;
}
