import { PresetBuildCallbacks } from "../../callbacks/PresetBuildCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class PresetStaticRouter extends StaticRouter {
    protected presetCallbacks: PresetBuildCallbacks;
    constructor(presetCallbacks: PresetBuildCallbacks);
}
