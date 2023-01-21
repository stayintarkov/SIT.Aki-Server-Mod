import { CustomizationCallbacks } from "../../callbacks/CustomizationCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class CustomizationStaticRouter extends StaticRouter {
    protected customizationCallbacks: CustomizationCallbacks;
    constructor(customizationCallbacks: CustomizationCallbacks);
}
