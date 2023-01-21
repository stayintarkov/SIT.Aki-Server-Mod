import { BundleCallbacks } from "../../callbacks/BundleCallbacks";
import { DynamicRouter } from "../../di/Router";
export declare class BundleDynamicRouter extends DynamicRouter {
    protected bundleCallbacks: BundleCallbacks;
    constructor(bundleCallbacks: BundleCallbacks);
}
