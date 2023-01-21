import { IPmcData } from "../models/eft/common/IPmcData";
import { InsuredItem } from "../models/eft/common/tables/IBotBase";
import { Item, Repairable } from "../models/eft/common/tables/IItem";
import { IStaticAmmoDetails } from "../models/eft/common/tables/ILootBase";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { ItemBaseClassService } from "../services/ItemBaseClassService";
import { LocaleService } from "../services/LocaleService";
import { LocalisationService } from "../services/LocalisationService";
import { HashUtil } from "../utils/HashUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { MathUtil } from "../utils/MathUtil";
import { ObjectId } from "../utils/ObjectId";
import { RandomUtil } from "../utils/RandomUtil";
import { HandbookHelper } from "./HandbookHelper";
declare class ItemHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected randomUtil: RandomUtil;
    protected objectId: ObjectId;
    protected mathUtil: MathUtil;
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    protected itemBaseClassService: ItemBaseClassService;
    protected localisationService: LocalisationService;
    protected localeService: LocaleService;
    constructor(logger: ILogger, hashUtil: HashUtil, jsonUtil: JsonUtil, randomUtil: RandomUtil, objectId: ObjectId, mathUtil: MathUtil, databaseServer: DatabaseServer, handbookHelper: HandbookHelper, itemBaseClassService: ItemBaseClassService, localisationService: LocalisationService, localeService: LocaleService);
    /**
     * Checks if an id is a valid item. Valid meaning that it's an item that be stored in stash
     * @param       {string}    tpl       the template id / tpl
     * @returns                             boolean; true for items that may be in player posession and not quest items
     */
    isValidItem(tpl: string, invalidBaseTypes?: string[]): boolean;
    /**
     * Check if the tpl / template Id provided is a descendent of the baseclass
     *
     * @param   {string}    tpl             the item template id to check
     * @param   {string}    baseClassTpl    the baseclass to check for
     * @return  {boolean}                   is the tpl a descendent?
     */
    isOfBaseclass(tpl: string, baseClassTpl: string): boolean;
    /**
     * Check if item has any of the supplied base clases
     * @param tpl Item to check base classes of
     * @param baseClassTpls base classes to check for
     * @returns true if any supplied base classes match
     */
    isOfBaseclasses(tpl: string, baseClassTpls: string[]): boolean;
    /**
     * Returns the item price based on the handbook or as a fallback from the prices.json if the item is not
     * found in the handbook. If the price can't be found at all return 0
     *
     * @param {string}      tpl           the item template to check
     * @returns {integer}                   The price of the item or 0 if not found
     */
    getItemPrice(tpl: string): number;
    fixItemStackCount(item: Item): Item;
    /**
     * AmmoBoxes contain StackSlots which need to be filled for the AmmoBox to have content.
     * Here's what a filled AmmoBox looks like:
     *   {
     *       "_id": "b1bbe982daa00ac841d4ae4d",
     *       "_tpl": "57372c89245977685d4159b1",
     *       "parentId": "5fe49a0e2694b0755a504876",
     *       "slotId": "hideout",
     *       "location": {
     *           "x": 3,
     *           "y": 4,
     *           "r": 0
     *       },
     *       "upd": {
     *           "StackObjectsCount": 1
     *       }
     *   },
     *   {
     *       "_id": "b997b4117199033afd274a06",
     *       "_tpl": "56dff061d2720bb5668b4567",
     *       "parentId": "b1bbe982daa00ac841d4ae4d",
     *       "slotId": "cartridges",
     *       "location": 0,
     *       "upd": {
     *           "StackObjectsCount": 30
     *       }
     *   }
     * Given the AmmoBox Item (first object) this function generates the StackSlot (second object) and returns it.
     * StackSlots are only used for AmmoBoxes which only have one element in StackSlots. However, it seems to be generic
     * to possibly also have more than one StackSlot. As good as possible, without seeing items having more than one
     * StackSlot, this function takes account of this and creates and returns an array of StackSlotItems
     *
     * @param {object}      item            The item template of the AmmoBox as given in items.json
     * @param {string}      parentId        The id of the AmmoBox instance these StackSlotItems should be children of
     * @returns {array}                     The array of StackSlotItems
     */
    generateItemsFromStackSlot(item: ITemplateItem, parentId: string): Item[];
    /**
     * Get cloned copy of all item data from items.json
     * @returns array of ITemplateItem objects
     */
    getItems(): ITemplateItem[];
    /**
     * Gets item data from items.json
     * @param tpl items template id to look up
     * @returns bool - is valid + template item object as array
     */
    getItem(tpl: string): [boolean, ITemplateItem];
    /**
     * get normalized value (0-1) based on item condition
     * @param item
     * @returns number between 0 and 1
     */
    getItemQualityModifier(item: Item): number;
    /**
     * Get a quality value based on a repairable items (weapon/armor) current state between current and max durability
     * @param itemDetails
     * @param repairable repairable object
     * @param item
     * @returns a number between 0 and 1
     */
    protected getRepairableItemQualityValue(itemDetails: ITemplateItem, repairable: Repairable, item: Item): number;
    /**
     * Recursive function that looks at every item from parameter and gets their childrens Ids
     * @param items
     * @param itemID
     * @returns an array of strings
     */
    findAndReturnChildrenByItems(items: Item[], itemID: string): string[];
    /**
     * A variant of findAndReturnChildren where the output is list of item objects instead of their ids.
     * @param items
     * @param baseItemId
     * @returns An array of Item objects
     */
    findAndReturnChildrenAsItems(items: Item[], baseItemId: string): Item[];
    /**
     * Find children of the item in a given assort (weapons parts for example, need recursive loop function)
     * @param itemIdToFind Template id of item to check for
     * @param assort Array of items to check in
     * @returns Array of children of requested item
     */
    findAndReturnChildrenByAssort(itemIdToFind: string, assort: Item[]): Item[];
    /**
     * Check if the passed in item has buy count restrictions
     * @param itemToCheck Item to check
     * @returns true if it has buy restrictions
     */
    hasBuyRestrictions(itemToCheck: Item): boolean;
    /**
     * is the passed in template id a dog tag
     * @param tpl Template id to check
     * @returns true if it is a dogtag
     */
    isDogtag(tpl: string): boolean;
    /**
     * Can the item passed in be sold to a trader because it is raw money
     * @param tpl Item template id to check
     * @returns true if unsellable
     */
    isNotSellable(tpl: string): boolean;
    /**
     * Gets the identifier for a child using slotId, locationX and locationY.
     * @param item
     * @returns "slotId OR slotid,locationX,locationY"
     */
    getChildId(item: Item): string;
    /**
     * Can the pased in item be stacked
     * @param tpl item to check
     * @returns true if it can be stacked
     */
    isItemTplStackable(tpl: string): boolean;
    /**
     * split item stack if it exceeds StackMaxSize
     */
    splitStack(item: Item): Item[];
    /**
     * Find Barter items in the inventory
     * @param {string} by
     * @param {Object} pmcData
     * @param {string} barterItemId
     * @returns Array of Item objects
     */
    findBarterItems(by: string, pmcData: IPmcData, barterItemId: string): Item[];
    /**
     *
     * @param pmcData
     * @param items
     * @param insuredItems insured items to not replace ids for
     * @param fastPanel
     * @returns
     */
    replaceIDs(pmcData: IPmcData, items: Item[], insuredItems?: InsuredItem[], fastPanel?: any): any[];
    /**
     * WARNING, SLOW. Recursivly loop down through an items hierarchy to see if any of the ids match the supplied list, return true if any do
     * @param {string} tpl
     * @param {Array} tplsToCheck
     * @returns boolean
     */
    doesItemOrParentsIdMatch(tpl: string, tplsToCheck: string[]): boolean;
    /**
     * Return true if item is a quest item
     * @param {string} tpl
     * @returns boolean
     */
    isQuestItem(tpl: string): boolean;
    /**
     * Get the inventory size of an item
     * @param items
     * @param rootItemId
     * @returns ItemSize object (width and height)
     */
    getItemSize(items: Item[], rootItemId: string): ItemHelper.ItemSize;
    /**
     * Get a random cartridge from an items Filter property
     * @param item
     * @returns
     */
    getRandomCompatibleCaliberTemplateId(item: ITemplateItem): string;
    createRandomMagCartridges(magTemplate: ITemplateItem, parentId: string, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, caliber?: string): Item;
    protected getRandomValidCaliber(magTemplate: ITemplateItem): string;
    protected drawAmmoTpl(caliber: string, staticAmmoDist: Record<string, IStaticAmmoDetails[]>): string;
    createCartidges(parentId: string, ammoTpl: string, stackCount: number): Item;
    /**
     * Get the size of a stack, return 1 if no stack object count property found
     * @param item Item to get stack size of
     * @returns size of stack
     */
    getItemStackSize(item: Item): number;
    /**
     * Get the name of an item from the locale file using the item tpl
     * @param itemTpl Tpl of item to get name of
     * @returns Name of item
     */
    getItemName(itemTpl: string): string;
}
declare namespace ItemHelper {
    interface ItemSize {
        width: number;
        height: number;
    }
}
export { ItemHelper };
