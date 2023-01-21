import { PresetHelper } from "../helpers/PresetHelper";
import { DatabaseServer } from "../servers/DatabaseServer";
export declare class PresetController {
    protected presetHelper: PresetHelper;
    protected databaseServer: DatabaseServer;
    constructor(presetHelper: PresetHelper, databaseServer: DatabaseServer);
    initialize(): void;
}
