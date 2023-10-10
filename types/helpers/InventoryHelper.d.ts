import { IPmcData } from "../models/eft/common/IPmcData";
import { Inventory } from "../models/eft/common/tables/IBotBase";
import { Item } from "../models/eft/common/tables/IItem";
import { AddItem, IAddItemRequestData } from "../models/eft/inventory/IAddItemRequestData";
import { IAddItemTempObject } from "../models/eft/inventory/IAddItemTempObject";
import { IInventoryMergeRequestData } from "../models/eft/inventory/IInventoryMergeRequestData";
import { IInventoryMoveRequestData } from "../models/eft/inventory/IInventoryMoveRequestData";
import { IInventoryRemoveRequestData } from "../models/eft/inventory/IInventoryRemoveRequestData";
import { IInventorySplitRequestData } from "../models/eft/inventory/IInventorySplitRequestData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IInventoryConfig, RewardDetails } from "../models/spt/config/IInventoryConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { FenceService } from "../services/FenceService";
import { LocalisationService } from "../services/LocalisationService";
import { HashUtil } from "../utils/HashUtil";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { ContainerHelper } from "./ContainerHelper";
import { DialogueHelper } from "./DialogueHelper";
import { ItemHelper } from "./ItemHelper";
import { PaymentHelper } from "./PaymentHelper";
import { ProfileHelper } from "./ProfileHelper";
import { TraderAssortHelper } from "./TraderAssortHelper";
export interface OwnerInventoryItems {
    /** Inventory items from source */
    from: Item[];
    /** Inventory items at destination */
    to: Item[];
    sameInventory: boolean;
    isMail: boolean;
}
export declare class InventoryHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected httpResponse: HttpResponseUtil;
    protected fenceService: FenceService;
    protected databaseServer: DatabaseServer;
    protected paymentHelper: PaymentHelper;
    protected traderAssortHelper: TraderAssortHelper;
    protected dialogueHelper: DialogueHelper;
    protected itemHelper: ItemHelper;
    protected containerHelper: ContainerHelper;
    protected profileHelper: ProfileHelper;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected inventoryConfig: IInventoryConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, hashUtil: HashUtil, httpResponse: HttpResponseUtil, fenceService: FenceService, databaseServer: DatabaseServer, paymentHelper: PaymentHelper, traderAssortHelper: TraderAssortHelper, dialogueHelper: DialogueHelper, itemHelper: ItemHelper, containerHelper: ContainerHelper, profileHelper: ProfileHelper, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * BUG: Passing the same item multiple times with a count of 1 will cause multiples of that item to be added (e.g. x3 separate objects of tar cola with count of 1 = 9 tarcolas being added to inventory)
     * @param pmcData Profile to add items to
     * @param request request data to add items
     * @param output response to send back to client
     * @param sessionID Session id
     * @param callback Code to execute later (function)
     * @param foundInRaid Will results added to inventory be set as found in raid
     * @param addUpd Additional upd properties for items being added to inventory
     * @param useSortingTable Allow items to go into sorting table when stash has no space
     * @returns IItemEventRouterResponse
     */
    addItem(pmcData: IPmcData, request: IAddItemRequestData, output: IItemEventRouterResponse, sessionID: string, callback: () => void, foundInRaid?: boolean, addUpd?: any, useSortingTable?: boolean): IItemEventRouterResponse;
    /**
     * Take the given item, find a free slot in passed in inventory and place it there
     * If no space in inventory, place in sorting table
     * @param itemToAdd Item to add to inventory
     * @param stashFS2D Two dimentional stash map
     * @param sortingTableFS2D Two dimentional sorting table stash map
     * @param itemLib
     * @param pmcData Player profile
     * @param useSortingTable Should sorting table be used for overflow items when no inventory space for item
     * @param output Client output object
     * @returns Client error output if placing item failed
     */
    protected placeItemInInventory(itemToAdd: IAddItemTempObject, stashFS2D: number[][], sortingTableFS2D: number[][], itemLib: Item[], playerInventory: Inventory, useSortingTable: boolean, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Add ammo to ammo boxes
     * @param itemToAdd Item to check is ammo box
     * @param parentId Ammo box parent id
     * @param output IItemEventRouterResponse object
     * @param sessionID Session id
     * @param pmcData Profile to add ammobox to
     * @param output object to send to client
     * @param foundInRaid should ammo be FiR
     */
    protected hydrateAmmoBoxWithAmmo(pmcData: IPmcData, itemToAdd: IAddItemTempObject, parentId: string, sessionID: string, output: IItemEventRouterResponse, foundInRaid: boolean): void;
    /**
     *
     * @param assortItems Items to add to inventory
     * @param requestItem Details of purchased item to add to inventory
     * @param result Array split stacks are added to
     */
    protected splitStackIntoSmallerStacks(assortItems: Item[], requestItem: AddItem, result: IAddItemTempObject[]): void;
    /**
     * Handle Remove event
     * Remove item from player inventory + insured items array
     * Also deletes child items
     * @param profile Profile to remove item from (pmc or scav)
     * @param itemId Items id to remove
     * @param sessionID Session id
     * @param output Existing IItemEventRouterResponse object to append data to, creates new one by default if not supplied
     * @returns IItemEventRouterResponse
     */
    removeItem(profile: IPmcData, itemId: string, sessionID: string, output?: IItemEventRouterResponse): IItemEventRouterResponse;
    removeItemAndChildrenFromMailRewards(sessionId: string, removeRequest: IInventoryRemoveRequestData, output: IItemEventRouterResponse): IItemEventRouterResponse;
    removeItemByCount(pmcData: IPmcData, itemId: string, count: number, sessionID: string, output?: IItemEventRouterResponse): IItemEventRouterResponse;
    getItemSize(itemTpl: string, itemID: string, inventoryItem: Item[]): number[];
    protected getSizeByInventoryItemHash(itemTpl: string, itemID: string, inventoryItemHash: InventoryHelper.InventoryItemHash): number[];
    protected getInventoryItemHash(inventoryItem: Item[]): InventoryHelper.InventoryItemHash;
    getContainerMap(containerW: number, containerH: number, itemList: Item[], containerId: string): number[][];
    /**
     * Return the inventory that needs to be modified (scav/pmc etc)
     * Changes made to result apply to character inventory
     * Based on the item action, determine whose inventories we should be looking at for from and to.
     * @param request Item interaction request
     * @param sessionId Session id / playerid
     * @returns OwnerInventoryItems with inventory of player/scav to adjust
     */
    getOwnerInventoryItems(request: IInventoryMoveRequestData | IInventorySplitRequestData | IInventoryMergeRequestData, sessionId: string): OwnerInventoryItems;
    /**
     * Made a 2d array table with 0 - free slot and 1 - used slot
     * @param {Object} pmcData
     * @param {string} sessionID
     * @returns Array
     */
    protected getStashSlotMap(pmcData: IPmcData, sessionID: string): number[][];
    protected getSortingTableSlotMap(pmcData: IPmcData): number[][];
    /**
     * Get Player Stash Proper Size
     * @param sessionID Playerid
     * @returns Array of 2 values, x and y stash size
     */
    protected getPlayerStashSize(sessionID: string): Record<number, number>;
    /**
     * Get the players stash items tpl
     * @param sessionID Player id
     * @returns Stash tpl
     */
    protected getStashType(sessionID: string): string;
    /**
     * Internal helper function to transfer an item from one profile to another.
     * @param fromItems Inventory of the source (can be non-player)
     * @param toItems Inventory of the destination
     * @param body Move request
     */
    moveItemToProfile(fromItems: Item[], toItems: Item[], body: IInventoryMoveRequestData): void;
    /**
     * Internal helper function to move item within the same profile_f.
     * @param pmcData profile to edit
     * @param inventoryItems
     * @param moveRequest
     * @returns True if move was successful
     */
    moveItemInternal(pmcData: IPmcData, inventoryItems: Item[], moveRequest: IInventoryMoveRequestData): {
        success: boolean;
        errorMessage?: string;
    };
    /**
     * Update fast panel bindings when an item is moved into a container that doesnt allow quick slot access
     * @param pmcData Player profile
     * @param itemBeingMoved item being moved
     */
    protected updateFastPanelBinding(pmcData: IPmcData, itemBeingMoved: Item): void;
    /**
    * Internal helper function to handle cartridges in inventory if any of them exist.
    */
    protected handleCartridges(items: Item[], body: IInventoryMoveRequestData): void;
    /**
     * Get details for how a random loot container should be handled, max rewards, possible reward tpls
     * @param itemTpl Container being opened
     * @returns Reward details
     */
    getRandomLootContainerRewardDetails(itemTpl: string): RewardDetails;
    getInventoryConfig(): IInventoryConfig;
}
declare namespace InventoryHelper {
    interface InventoryItemHash {
        byItemId: Record<string, Item>;
        byParentId: Record<string, Item[]>;
    }
}
export {};
