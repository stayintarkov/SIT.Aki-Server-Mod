import { DataCallbacks } from "../../callbacks/DataCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class DataStaticRouter extends StaticRouter {
    protected dataCallbacks: DataCallbacks;
    constructor(dataCallbacks: DataCallbacks);
}
