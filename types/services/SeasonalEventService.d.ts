import { BotHelper } from "../helpers/BotHelper";
import { Config } from "../models/eft/common/IGlobals";
import { Inventory } from "../models/eft/common/tables/IBotType";
import { ISeasonalEvent, ISeasonalEventConfig } from "../models/spt/config/ISeasonalEventConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocalisationService } from "./LocalisationService";
export declare class SeasonalEventService {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected localisationService: LocalisationService;
    protected botHelper: BotHelper;
    protected configServer: ConfigServer;
    protected seasonalEventConfig: ISeasonalEventConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, localisationService: LocalisationService, botHelper: BotHelper, configServer: ConfigServer);
    protected get events(): Record<string, string>;
    protected get christmasEventItems(): string[];
    protected get halloweenEventItems(): string[];
    /**
     * Get an array of christmas items found in bots inventories as loot
     * @returns array
     */
    getChristmasEventItems(): string[];
    /**
     * Get an array of halloween items found in bots inventories as loot
     * @returns array
     */
    getHalloweenEventItems(): string[];
    itemIsChristmasRelated(itemTpl: string): boolean;
    itemIsHalloweenRelated(itemTpl: string): boolean;
    /**
     * Check if item id exists in christmas or halloween event arrays
     * @param itemTpl item tpl to check for
     * @returns
     */
    itemIsSeasonalRelated(itemTpl: string): boolean;
    /**
     * Get an array of items that appear during a seasonal event
     * returns multiple seasonal event items if they are both active
     * @returns array of tpl strings
     */
    getAllSeasonalEventItems(): string[];
    /**
     * Get an array of seasonal items that should be blocked as seasonal is not active
     * @returns Array of tpl strings
     */
    getSeasonalEventItemsToBlock(): string[];
    /**
     * Is a seasonal event currently active
     * @returns true if event is active
     */
    seasonalEventEnabled(): boolean;
    /**
     * is christmas event active
     * @returns true if active
     */
    christmasEventEnabled(): boolean;
    /**
     * is christmas event active
     * @returns true if active
     */
    halloweenEventEnabled(): boolean;
    /**
     * Is detection of seasonal events enabled (halloween / christmas)
     * @returns true if seasonal events should be checked for
     */
    isAutomaticEventDetectionEnabled(): boolean;
    /**
     * Get a dictionary of gear changes to apply to bots for a specific event e.g. Christmas/Halloween
     * @param eventName Name of event to get gear changes for
     * @returns bots with equipment changes
     */
    protected getEventBotGear(eventName: string): Record<string, Record<string, Record<string, number>>>;
    /**
     * Get the dates each seasonal event starts and ends at
     * @returns Record with event name + start/end date
     */
    getEventDetails(): ISeasonalEvent[];
    /**
     * Check if current date falls inside any of the seasons events pased in, if so, handle them
     */
    checkForAndEnableSeasonalEvents(): void;
    /**
     * Iterate through bots inventory and loot to find and remove christmas items (as defined in SeasonalEventService)
     * @param nodeInventory Bots inventory to iterate over
     * @param botRole the role of the bot being processed
     */
    removeChristmasItemsFromBotInventory(nodeInventory: Inventory, botRole: string): void;
    /**
     * Make adjusted to server code based on the name of the event passed in
     * @param globalConfig globals.json
     * @param eventName Name of the event to enable. e.g. Christmas
     */
    protected updateGlobalEvents(globalConfig: Config, eventName: string): void;
    /**
     * Add lootble items from backpack into patrol.ITEMS_TO_DROP difficulty property
     */
    protected addLootItemsToGifterDropItemsList(): void;
    /**
     * Read in data from seasonalEvents.json and add found equipment items to bots
     * @param eventName Name of the event to read equipment in from config
     */
    protected addEventGearToBots(eventName: string): void;
    protected addPumpkinsToScavBackpacks(): void;
    /**
     * Set Khorovod(dancing tree) chance to 100% on all maps that support it
     */
    protected enableDancingTree(): void;
    /**
     * Add santa to maps
     */
    protected addGifterBotToMaps(): void;
}
