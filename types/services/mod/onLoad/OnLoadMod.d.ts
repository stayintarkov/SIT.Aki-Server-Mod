import { OnLoad } from "../../../di/OnLoad";
export declare class OnLoadMod extends OnLoad {
    private onLoadOverride;
    private getRouteOverride;
    constructor(onLoadOverride: () => void, getRouteOverride: () => string);
    onLoad(): Promise<void>;
    getRoute(): string;
}
