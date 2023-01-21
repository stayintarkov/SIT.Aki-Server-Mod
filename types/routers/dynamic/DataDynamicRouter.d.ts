import { DataCallbacks } from "../../callbacks/DataCallbacks";
import { DynamicRouter } from "../../di/Router";
export declare class DataDynamicRouter extends DynamicRouter {
    protected dataCallbacks: DataCallbacks;
    constructor(dataCallbacks: DataCallbacks);
}
