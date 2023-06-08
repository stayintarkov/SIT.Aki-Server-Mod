import { ItemHelper } from "../helpers/ItemHelper";
import { Preset } from "../models/eft/common/IGlobals";
import { Item } from "../models/eft/common/tables/IItem";
import { IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SeasonalEventService } from "../services/SeasonalEventService";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
export declare class RagfairAssortGenerator {
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected databaseServer: DatabaseServer;
    protected seasonalEventService: SeasonalEventService;
    protected configServer: ConfigServer;
    protected generatedAssortItems: Item[];
    protected ragfairConfig: IRagfairConfig;
    constructor(jsonUtil: JsonUtil, hashUtil: HashUtil, itemHelper: ItemHelper, databaseServer: DatabaseServer, seasonalEventService: SeasonalEventService, configServer: ConfigServer);
    /**
     * Get an array of unique items that can be sold on the flea
     * @returns array of unique items
     */
    getAssortItems(): Item[];
    /**
     * Check internal generatedAssortItems array has objects
     * @returns true if array has objects
     */
    protected assortsAreGenerated(): boolean;
    /**
     * Generate an array of items the flea can sell
     * @returns array of unique items
     */
    protected generateRagfairAssortItems(): Item[];
    /**
     * Get presets from globals.json
     * @returns Preset object array
     */
    protected getPresets(): Preset[];
    /**
     * Get default presets from globals.json
     * @returns Preset object array
     */
    protected getDefaultPresets(): Preset[];
    /**
     * Create a base assort item and return it with populated values + 999999 stack count + unlimited count = true
     * @param tplId tplid to add to item
     * @param id id to add to item
     * @returns hydrated Item object
     */
    protected createRagfairAssortItem(tplId: string, id?: string): Item;
}
