import { OnUpdate } from "../../../di/OnUpdate";
export declare class OnUpdateMod extends OnUpdate {
    private onUpdateOverride;
    private getRouteOverride;
    constructor(onUpdateOverride: (timeSinceLastRun: number) => boolean, getRouteOverride: () => string);
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
