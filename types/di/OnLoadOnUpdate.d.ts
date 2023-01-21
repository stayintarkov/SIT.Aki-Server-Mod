import { OnLoad } from "./OnLoad";
import { OnUpdate } from "./OnUpdate";
export declare class OnLoadOnUpdate implements OnLoad, OnUpdate {
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    onLoad(): Promise<void>;
    getRoute(): string;
}
