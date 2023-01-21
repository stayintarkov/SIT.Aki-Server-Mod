import { OnLoadOnUpdate } from "../di/OnLoadOnUpdate";
import { SaveServer } from "../servers/SaveServer";
export declare class SaveCallbacks extends OnLoadOnUpdate {
    protected saveServer: SaveServer;
    constructor(saveServer: SaveServer);
    onLoad(): Promise<void>;
    getRoute(): string;
    onUpdate(secondsSinceLastRun: number): Promise<boolean>;
}
