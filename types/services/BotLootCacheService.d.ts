import { PMCLootGenerator } from "../generators/PMCLootGenerator";
import { ItemHelper } from "../helpers/ItemHelper";
import { IBotType } from "../models/eft/common/tables/IBotType";
import { ITemplateItem, Props } from "../models/eft/common/tables/ITemplateItem";
import { IBotLootCache, LootCacheType } from "../models/spt/bots/IBotLootCache";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { JsonUtil } from "../utils/JsonUtil";
import { LocalisationService } from "./LocalisationService";
import { RagfairPriceService } from "./RagfairPriceService";
export declare class BotLootCacheService {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected itemHelper: ItemHelper;
    protected databaseServer: DatabaseServer;
    protected pmcLootGenerator: PMCLootGenerator;
    protected localisationService: LocalisationService;
    protected ragfairPriceService: RagfairPriceService;
    protected lootCache: Record<string, IBotLootCache>;
    constructor(logger: ILogger, jsonUtil: JsonUtil, itemHelper: ItemHelper, databaseServer: DatabaseServer, pmcLootGenerator: PMCLootGenerator, localisationService: LocalisationService, ragfairPriceService: RagfairPriceService);
    /**
     * Remove cached bot loot data
     */
    clearCache(): void;
    /**
     * Get the fully created loot array, ordered by price low to high
     * @param botRole bot to get loot for
     * @param isPmc is the bot a pmc
     * @param lootType what type of loot is needed (backpack/pocket/stim/vest etc)
     * @param botJsonTemplate Base json db file for the bot having its loot generated
     * @returns ITemplateItem array
     */
    getLootFromCache(botRole: string, isPmc: boolean, lootType: LootCacheType, botJsonTemplate: IBotType): ITemplateItem[];
    /**
     * Generate loot for a bot and store inside a private class property
     * @param botRole bots role (assault / pmcBot etc)
     * @param isPmc Is the bot a PMC (alteres what loot is cached)
     * @param botJsonTemplate db template for bot having its loot generated
     */
    protected addLootToCache(botRole: string, isPmc: boolean, botJsonTemplate: IBotType): void;
    /**
     * Sort a pool of item objects by its flea price
     * @param poolToSort pool of items to sort
     */
    protected sortPoolByRagfairPrice(poolToSort: ITemplateItem[]): void;
    /**
     * Add unique items into combined pool
     * @param combinedItemPool Pool of items to add to
     * @param itemsToAdd items to add to combined pool if unique
     */
    protected addUniqueItemsToPool(combinedItemPool: ITemplateItem[], itemsToAdd: ITemplateItem[]): void;
    /**
     * Ammo/grenades have this property
     * @param props
     * @returns
     */
    protected isBulletOrGrenade(props: Props): boolean;
    /**
     * Internal and external magazine have this property
     * @param props
     * @returns
     */
    protected isMagazine(props: Props): boolean;
    /**
     * Medical use items (e.g. morphine/lip balm/grizzly)
     * @param props
     * @returns
     */
    protected isMedicalItem(props: Props): boolean;
    /**
     * Grenades have this property (e.g. smoke/frag/flash grenades)
     * @param props
     * @returns
     */
    protected isGrenade(props: Props): boolean;
    /**
     * Check if a bot type exists inside the loot cache
     * @param botRole role to check for
     * @returns true if they exist
     */
    protected botRoleExistsInCache(botRole: string): boolean;
    /**
     * If lootcache is null, init with empty property arrays
     * @param botRole Bot role to hydrate
     */
    protected initCacheForBotRole(botRole: string): void;
    /**
     * Compares two item prices by their flea (or handbook if that doesnt exist) price
     * -1 when a < b
     * 0 when a === b
     * 1 when a > b
     * @param itemAPrice
     * @param itemBPrice
     * @returns
     */
    protected compareByValue(itemAPrice: number, itemBPrice: number): number;
}
