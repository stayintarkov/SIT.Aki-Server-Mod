import { MinMax } from "../models/common/MinMax";
import { Inventory } from "../models/eft/common/tables/IBotBase";
import { Item } from "../models/eft/common/tables/IItem";
import { Grid, ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocalisationService } from "../services/LocalisationService";
import { HashUtil } from "../utils/HashUtil";
import { RandomUtil } from "../utils/RandomUtil";
import { ContainerHelper } from "./ContainerHelper";
import { InventoryHelper } from "./InventoryHelper";
import { ItemHelper } from "./ItemHelper";
export declare class BotWeaponGeneratorHelper {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected randomUtil: RandomUtil;
    protected hashUtil: HashUtil;
    protected inventoryHelper: InventoryHelper;
    protected localisationService: LocalisationService;
    protected containerHelper: ContainerHelper;
    constructor(logger: ILogger, databaseServer: DatabaseServer, itemHelper: ItemHelper, randomUtil: RandomUtil, hashUtil: HashUtil, inventoryHelper: InventoryHelper, localisationService: LocalisationService, containerHelper: ContainerHelper);
    /**
     * Get a randomised number of bullets for a specific magazine
     * @param magCounts min and max count of magazines
     * @param magTemplate magazine to generate bullet count for
     * @returns bullet count number
     */
    getRandomisedBulletCount(magCounts: MinMax, magTemplate: ITemplateItem): number;
    /**
     * Get a randomised count of magazines
     * @param magCounts min and max value returned value can be between
     * @returns numberical value of magazine count
     */
    getRandomisedMagazineCount(magCounts: MinMax): number;
    /**
     * Is this magazine cylinder related (revolvers and grenade launchers)
     * @param magazineParentName the name of the magazines parent
     * @returns true if it is cylinder related
     */
    magazineIsCylinderRelated(magazineParentName: string): boolean;
    /**
     * Create a magazine using the parameters given
     * @param magazineTpl Tpl of the magazine to create
     * @param ammoTpl Ammo to add to magazine
     * @param magTemplate template object of magazine
     * @returns Item array
     */
    createMagazine(magazineTpl: string, ammoTpl: string, magTemplate: ITemplateItem): Item[];
    /**
     * Add a specific number of cartrdiges to a bots inventory (vest/pocket)
     * @param ammoTpl Ammo tpl to add to vest/pockets
     * @param cartridgeCount number of cartridges to add to vest/pockets
     * @param inventory bot inventory to add cartridges to
     */
    addBulletsToVestAndPockets(ammoTpl: string, cartridgeCount: number, inventory: Inventory): void;
    /**
     * Get a weapons default magazine template id
     * @param weaponTemplate weapon to get default magazine for
     * @returns tpl of magazine
     */
    getWeaponsDefaultMagazineTpl(weaponTemplate: ITemplateItem): string;
    /**
     * Adds an item with all its childern into specified equipmentSlots, wherever it fits.
     * @param equipmentSlots
     * @param parentId
     * @param parentTpl
     * @param itemWithChildren
     * @param inventory
     * @returns a `boolean` indicating item was added
     */
    addItemWithChildrenToEquipmentSlot(equipmentSlots: string[], parentId: string, parentTpl: string, itemWithChildren: Item[], inventory: Inventory): boolean;
    /**
     * is the provided item allowed inside a container
     * @param slot location item wants to be placed in
     * @param itemTpl item being placed
     * @returns true if allowed
     */
    protected itemAllowedInContainer(slot: Grid, itemTpl: string): boolean;
}
