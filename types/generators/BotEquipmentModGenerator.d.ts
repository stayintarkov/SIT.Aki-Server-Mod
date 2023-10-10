import { BotGeneratorHelper } from "../helpers/BotGeneratorHelper";
import { BotHelper } from "../helpers/BotHelper";
import { BotWeaponGeneratorHelper } from "../helpers/BotWeaponGeneratorHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { ProbabilityHelper } from "../helpers/ProbabilityHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { Mods, ModsChances } from "../models/eft/common/tables/IBotType";
import { Item } from "../models/eft/common/tables/IItem";
import { ITemplateItem, Slot } from "../models/eft/common/tables/ITemplateItem";
import { EquipmentFilterDetails, IBotConfig } from "../models/spt/config/IBotConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { BotEquipmentFilterService } from "../services/BotEquipmentFilterService";
import { BotEquipmentModPoolService } from "../services/BotEquipmentModPoolService";
import { BotModLimits, BotWeaponModLimitService } from "../services/BotWeaponModLimitService";
import { ItemFilterService } from "../services/ItemFilterService";
import { LocalisationService } from "../services/LocalisationService";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { RandomUtil } from "../utils/RandomUtil";
export declare class BotEquipmentModGenerator {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected probabilityHelper: ProbabilityHelper;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected botEquipmentFilterService: BotEquipmentFilterService;
    protected itemFilterService: ItemFilterService;
    protected profileHelper: ProfileHelper;
    protected botWeaponModLimitService: BotWeaponModLimitService;
    protected botHelper: BotHelper;
    protected botGeneratorHelper: BotGeneratorHelper;
    protected botWeaponGeneratorHelper: BotWeaponGeneratorHelper;
    protected localisationService: LocalisationService;
    protected botEquipmentModPoolService: BotEquipmentModPoolService;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, hashUtil: HashUtil, randomUtil: RandomUtil, probabilityHelper: ProbabilityHelper, databaseServer: DatabaseServer, itemHelper: ItemHelper, botEquipmentFilterService: BotEquipmentFilterService, itemFilterService: ItemFilterService, profileHelper: ProfileHelper, botWeaponModLimitService: BotWeaponModLimitService, botHelper: BotHelper, botGeneratorHelper: BotGeneratorHelper, botWeaponGeneratorHelper: BotWeaponGeneratorHelper, localisationService: LocalisationService, botEquipmentModPoolService: BotEquipmentModPoolService, configServer: ConfigServer);
    /**
     * Check mods are compatible and add to array
     * @param equipment Equipment item to add mods to
     * @param modPool Mod list to choose frm
     * @param parentId parentid of item to add mod to
     * @param parentTemplate template objet of item to add mods to
     * @param modSpawnChances dictionary of mod items and their chance to spawn for this bot type
     * @param botRole the bot role being generated for
     * @param forceSpawn should this mod be forced to spawn
     * @returns Item + compatible mods as an array
     */
    generateModsForEquipment(equipment: Item[], modPool: Mods, parentId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances, botRole: string, forceSpawn?: boolean): Item[];
    /**
     * Add mods to a weapon using the provided mod pool
     * @param sessionId session id
     * @param weapon Weapon to add mods to
     * @param modPool Pool of compatible mods to attach to weapon
     * @param weaponParentId parentId of weapon
     * @param parentTemplate Weapon which mods will be generated on
     * @param modSpawnChances Mod spawn chances
     * @param ammoTpl Ammo tpl to use when generating magazines/cartridges
     * @param botRole Role of bot weapon is generated for
     * @param botLevel lvel of the bot weapon is being generated for
     * @param modLimits limits placed on certian mod types per gun
     * @param botEquipmentRole role of bot when accessing bot.json equipment config settings
     * @returns Weapon + mods array
     */
    generateModsForWeapon(sessionId: string, weapon: Item[], modPool: Mods, weaponParentId: string, parentTemplate: ITemplateItem, modSpawnChances: ModsChances, ammoTpl: string, botRole: string, botLevel: number, modLimits: BotModLimits, botEquipmentRole: string): Item[];
    /**
     * Is this modslot a front or rear sight
     * @param modSlot Slot to check
     * @returns true if it's a front/rear sight
     */
    protected modIsFrontOrRearSight(modSlot: string): boolean;
    /**
     * Does the provided mod details show the mod can hold a scope
     * @param modSlot e.g. mod_scope, mod_mount
     * @param modsParentId Parent id of mod item
     * @returns true if it can hold a scope
     */
    protected modSlotCanHoldScope(modSlot: string, modsParentId: string): boolean;
    /**
     * Set mod spawn chances to defined amount
     * @param modSpawnChances Chance dictionary to update
     */
    protected adjustSlotSpawnChances(modSpawnChances: ModsChances, modSlotsToAdjust: string[], newChancePercent: number): void;
    protected modSlotCanHoldMuzzleDevices(modSlot: string, modsParentId: string): boolean;
    protected sortModKeys(unsortedKeys: string[]): string[];
    /**
     * Get a Slot property for an item (chamber/cartridge/slot)
     * @param modSlot e.g patron_in_weapon
     * @param parentTemplate item template
     * @returns Slot item
     */
    protected getModItemSlot(modSlot: string, parentTemplate: ITemplateItem): Slot;
    /**
     * Randomly choose if a mod should be spawned, 100% for required mods OR mod is ammo slot
     * never return true for an item that has 0% spawn chance
     * @param itemSlot slot the item sits in
     * @param modSlot slot the mod sits in
     * @param modSpawnChances Chances for various mod spawns
     * @returns boolean true if it should spawn
     */
    protected shouldModBeSpawned(itemSlot: Slot, modSlot: string, modSpawnChances: ModsChances): boolean;
    /**
     *
     * @param modSlot Slot mod will fit into
     * @param isRandomisableSlot Will generate a randomised mod pool if true
     * @param modsParent Parent slot the item will be a part of
     * @param botEquipBlacklist Blacklist to prevent mods from being picked
     * @param itemModPool Pool of items to pick from
     * @param weapon array with only weapon tpl in it, ready for mods to be added
     * @param ammoTpl ammo tpl to use if slot requires a cartridge to be added (e.g. mod_magazine)
     * @param parentTemplate Parent item the mod will go into
     * @returns ITemplateItem
     */
    protected chooseModToPutIntoSlot(modSlot: string, isRandomisableSlot: boolean, botWeaponSightWhitelist: Record<string, string[]>, botEquipBlacklist: EquipmentFilterDetails, itemModPool: Record<string, string[]>, weapon: Item[], ammoTpl: string, parentTemplate: ITemplateItem): [boolean, ITemplateItem];
    /**
     * Create a mod item with parameters as properties
     * @param modId _id
     * @param modTpl _tpl
     * @param parentId parentId
     * @param modSlot slotId
     * @param modTemplate Used to add additional properites in the upd object
     * @returns Item object
     */
    protected createModItem(modId: string, modTpl: string, parentId: string, modSlot: string, modTemplate: ITemplateItem, botRole: string): Item;
    /**
     * Get a list of containers that hold ammo
     * e.g. mod_magazine / patron_in_weapon_000
     * @returns string array
     */
    protected getAmmoContainers(): string[];
    /**
     * Get a random mod from an items compatible mods Filter array
     * @param modTpl ???? default value to return if nothing found
     * @param parentSlot item mod will go into, used to get combatible items
     * @param modSlot Slot to get mod to fill
     * @param items items to ensure picked mod is compatible with
     * @returns item tpl
     */
    protected getModTplFromItemDb(modTpl: string, parentSlot: Slot, modSlot: string, items: Item[]): string;
    /**
     * Log errors if mod is not compatible with slot
     * @param modToAdd template of mod to check
     * @param itemSlot slot the item will be placed in
     * @param modSlot slot the mod will fill
     * @param parentTemplate template of the mods parent item
     * @returns true if valid
     */
    protected isModValidForSlot(modToAdd: [boolean, ITemplateItem], itemSlot: Slot, modSlot: string, parentTemplate: ITemplateItem): boolean;
    /**
     * Find mod tpls of a provided type and add to modPool
     * @param desiredSlotName slot to look up and add we are adding tpls for (e.g mod_scope)
     * @param modTemplate db object for modItem we get compatible mods from
     * @param modPool Pool of mods we are adding to
     */
    protected addCompatibleModsForProvidedMod(desiredSlotName: string, modTemplate: ITemplateItem, modPool: Mods, botEquipBlacklist: EquipmentFilterDetails): void;
    /**
     * Get the possible items that fit a slot
     * @param parentItemId item tpl to get compatible items for
     * @param modSlot Slot item should fit in
     * @param botEquipBlacklist equipment that should not be picked
     * @returns array of compatible items for that slot
     */
    protected getDynamicModPool(parentItemId: string, modSlot: string, botEquipBlacklist: EquipmentFilterDetails): string[];
    /**
     * Take a list of tpls and filter out blacklisted values using itemFilterService + botEquipmentBlacklist
     * @param allowedMods base mods to filter
     * @param botEquipBlacklist equipment blacklist
     * @param modSlot slot mods belong to
     * @returns Filtered array of mod tpls
     */
    protected filterWeaponModsByBlacklist(allowedMods: string[], botEquipBlacklist: EquipmentFilterDetails, modSlot: string): string[];
    /**
     * With the shotgun revolver (60db29ce99594040e04c4a27) 12.12 introduced CylinderMagazines.
     * Those magazines (e.g. 60dc519adf4c47305f6d410d) have a "Cartridges" entry with a _max_count=0.
     * Ammo is not put into the magazine directly but assigned to the magazine's slots: The "camora_xxx" slots.
     * This function is a helper called by generateModsForItem for mods with parent type "CylinderMagazine"
     * @param items The items where the CylinderMagazine's camora are appended to
     * @param modPool modPool which should include available cartrigdes
     * @param parentId The CylinderMagazine's UID
     * @param parentTemplate The CylinderMagazine's template
     */
    protected fillCamora(items: Item[], modPool: Mods, parentId: string, parentTemplate: ITemplateItem): void;
    /**
     * Take a record of camoras and merge the compatable shells into one array
     * @param camorasWithShells camoras we want to merge into one array
     * @returns string array of shells fro luitple camora sources
     */
    protected mergeCamoraPoolsTogether(camorasWithShells: Record<string, string[]>): string[];
    /**
     * Filter out non-whitelisted weapon scopes
     * Controlled by bot.json weaponSightWhitelist
     * e.g. filter out rifle scopes from SMGs
     * @param weapon Weapon scopes will be added to
     * @param scopes Full scope pool
     * @param botWeaponSightWhitelist Whitelist of scope types by weapon base type
     * @returns Array of scope tpls that have been filtered to just ones allowed for that weapon type
     */
    protected filterSightsByWeaponType(weapon: Item, scopes: string[], botWeaponSightWhitelist: Record<string, string[]>): string[];
}
