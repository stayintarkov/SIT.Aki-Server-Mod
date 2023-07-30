import { IPreset } from "../models/eft/common/IGlobals";
import { DatabaseServer } from "../servers/DatabaseServer";
import { JsonUtil } from "../utils/JsonUtil";
export declare class PresetHelper {
    protected jsonUtil: JsonUtil;
    protected databaseServer: DatabaseServer;
    protected lookup: Record<string, string[]>;
    protected defaultPresets: Record<string, IPreset>;
    constructor(jsonUtil: JsonUtil, databaseServer: DatabaseServer);
    hydratePresetStore(input: Record<string, string[]>): void;
    getDefaultPresets(): Record<string, IPreset>;
    isPreset(id: string): boolean;
    hasPreset(templateId: string): boolean;
    getPreset(id: string): IPreset;
    getPresets(templateId: string): IPreset[];
    getDefaultPreset(templateId: string): IPreset;
    getBaseItemTpl(presetId: string): string;
}
