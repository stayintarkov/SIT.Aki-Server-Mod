import { PresetController } from "../controllers/PresetController";
import { OnLoad } from "../di/OnLoad";
export declare class PresetCallbacks extends OnLoad {
    protected presetController: PresetController;
    constructor(presetController: PresetController);
    onLoad(): Promise<void>;
    getRoute(): string;
}
