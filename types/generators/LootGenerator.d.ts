import { InventoryHelper } from "../helpers/InventoryHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { WeightedRandomHelper } from "../helpers/WeightedRandomHelper";
import { IPreset } from "../models/eft/common/IGlobals";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { AddItem } from "../models/eft/inventory/IAddItemRequestData";
import { ISealedAirdropContainerSettings, RewardDetails } from "../models/spt/config/IInventoryConfig";
import { LootItem } from "../models/spt/services/LootItem";
import { LootRequest } from "../models/spt/services/LootRequest";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { ItemFilterService } from "../services/ItemFilterService";
import { LocalisationService } from "../services/LocalisationService";
import { RagfairLinkedItemService } from "../services/RagfairLinkedItemService";
import { HashUtil } from "../utils/HashUtil";
import { RandomUtil } from "../utils/RandomUtil";
type ItemLimit = {
    current: number;
    max: number;
};
export declare class LootGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected databaseServer: DatabaseServer;
    protected randomUtil: RandomUtil;
    protected itemHelper: ItemHelper;
    protected presetHelper: PresetHelper;
    protected inventoryHelper: InventoryHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected localisationService: LocalisationService;
    protected ragfairLinkedItemService: RagfairLinkedItemService;
    protected itemFilterService: ItemFilterService;
    constructor(logger: ILogger, hashUtil: HashUtil, databaseServer: DatabaseServer, randomUtil: RandomUtil, itemHelper: ItemHelper, presetHelper: PresetHelper, inventoryHelper: InventoryHelper, weightedRandomHelper: WeightedRandomHelper, localisationService: LocalisationService, ragfairLinkedItemService: RagfairLinkedItemService, itemFilterService: ItemFilterService);
    /**
     * Generate a list of items based on configuration options parameter
     * @param options parameters to adjust how loot is generated
     * @returns An array of loot items
     */
    createRandomLoot(options: LootRequest): LootItem[];
    /**
     * Construct item limit record to hold max and current item count for each item type
     * @param limits limits as defined in config
     * @returns record, key: item tplId, value: current/max item count allowed
     */
    protected initItemLimitCounter(limits: Record<string, number>): Record<string, ItemLimit>;
    /**
     * Find a random item in items.json and add to result array
     * @param items items to choose from
     * @param itemTypeCounts item limit counts
     * @param options item filters
     * @param result array to add found item to
     * @returns true if item was valid and added to pool
     */
    protected findAndAddRandomItemToLoot(items: [string, ITemplateItem][], itemTypeCounts: Record<string, {
        current: number;
        max: number;
    }>, options: LootRequest, result: LootItem[]): boolean;
    /**
     * Get a randomised stack count for an item between its StackMinRandom and StackMaxSize values
     * @param item item to get stack count of
     * @param options loot options
     * @returns stack count
     */
    protected getRandomisedStackCount(item: ITemplateItem, options: LootRequest): number;
    /**
     * Find a random item in items.json and add to result array
     * @param globalDefaultPresets presets to choose from
     * @param itemTypeCounts item limit counts
     * @param itemBlacklist items to skip
     * @param result array to add found preset to
     * @returns true if preset was valid and added to pool
     */
    protected findAndAddRandomPresetToLoot(globalDefaultPresets: [string, IPreset][], itemTypeCounts: Record<string, {
        current: number;
        max: number;
    }>, itemBlacklist: string[], result: LootItem[]): boolean;
    /**
     * Sealed weapon containers have a weapon + associated mods inside them + assortment of other things (food/meds)
     * @param containerSettings sealed weapon container settings
     * @returns Array of items to add to player inventory
     */
    getSealedWeaponCaseLoot(containerSettings: ISealedAirdropContainerSettings): AddItem[];
    /**
     * Get non-weapon mod rewards for a sealed container
     * @param containerSettings Sealed weapon container settings
     * @param weaponDetailsDb Details for the weapon to reward player
     * @returns AddItem array
     */
    protected getSealedContainerNonWeaponModRewards(containerSettings: ISealedAirdropContainerSettings, weaponDetailsDb: ITemplateItem): AddItem[];
    /**
     * Iterate over the container weaponModRewardLimits settings and create an array of weapon mods to reward player
     * @param containerSettings Sealed weapon container settings
     * @param linkedItemsToWeapon All items that can be attached/inserted into weapon
     * @param chosenWeaponPreset The weapon preset given to player as reward
     * @returns AddItem array
     */
    protected getSealedContainerWeaponModRewards(containerSettings: ISealedAirdropContainerSettings, linkedItemsToWeapon: ITemplateItem[], chosenWeaponPreset: IPreset): AddItem[];
    /**
     * Handle event-related loot containers - currently just the halloween jack-o-lanterns that give food rewards
     * @param rewardContainerDetails
     * @returns AddItem array
     */
    getRandomLootContainerLoot(rewardContainerDetails: RewardDetails): AddItem[];
    /**
     * A bug in inventoryHelper.addItem() means you cannot add the same item to the array twice with a count of 1, it causes duplication
     * Default adds 1, or increments count
     * @param itemTplToAdd items tpl we want to add to array
     * @param resultsArray Array to add item tpl to
     */
    protected addOrIncrementItemToArray(itemTplToAdd: string, resultsArray: AddItem[]): void;
}
export {};
