import { CustomizationCallbacks } from "../../callbacks/CustomizationCallbacks";
import { DynamicRouter } from "../../di/Router";
export declare class CustomizationDynamicRouter extends DynamicRouter {
    protected customizationCallbacks: CustomizationCallbacks;
    constructor(customizationCallbacks: CustomizationCallbacks);
}
