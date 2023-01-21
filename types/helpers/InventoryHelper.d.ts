import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { IAddItemRequestData } from "../models/eft/inventory/IAddItemRequestData";
import { IInventoryMergeRequestData } from "../models/eft/inventory/IInventoryMergeRequestData";
import { IInventoryMoveRequestData } from "../models/eft/inventory/IInventoryMoveRequestData";
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
    from: Item[];
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
     * @param body request data to add items
     * @param output response to send back to client
     * @param sessionID Session id
     * @param callback
     * @param foundInRaid Will results added to inventory be set as found in raid
     * @param addUpd Additional upd propertys for items being added to inventory
     * @returns IItemEventRouterResponse
     */
    addItem(pmcData: IPmcData, body: IAddItemRequestData, output: IItemEventRouterResponse, sessionID: string, callback: any, foundInRaid?: boolean, addUpd?: any): IItemEventRouterResponse;
    removeItem(pmcData: IPmcData, itemId: string, sessionID: string, output?: IItemEventRouterResponse): IItemEventRouterResponse;
    removeItemByCount(pmcData: IPmcData, itemId: string, count: number, sessionID: string, output?: IItemEventRouterResponse): IItemEventRouterResponse;
    getItemSize(itemTpl: string, itemID: string, inventoryItem: Item[]): Record<number, number>;
    protected getSizeByInventoryItemHash(itemTpl: string, itemID: string, inventoryItemHash: InventoryHelper.InventoryItemHash): Record<number, number>;
    protected getInventoryItemHash(inventoryItem: Item[]): InventoryHelper.InventoryItemHash;
    getContainerMap(containerW: number, containerH: number, itemList: Item[], containerId: string): number[][];
    /**
     * Based on the item action, determine whose inventories we should be looking at for from and to.
     */
    getOwnerInventoryItems(body: IInventoryMoveRequestData | IInventorySplitRequestData | IInventoryMergeRequestData, sessionID: string): OwnerInventoryItems;
    /**
     * Made a 2d array table with 0 - free slot and 1 - used slot
     * @param {Object} pmcData
     * @param {string} sessionID
     * @returns Array
     */
    protected getStashSlotMap(pmcData: IPmcData, sessionID: string): number[][];
    protected getStashType(sessionID: string): string;
    protected getPlayerStashSize(sessionID: string): Record<number, number>;
    /**
    * Internal helper function to transfer an item from one profile to another.
    * fromProfileData: Profile of the source.
    * toProfileData: Profile of the destination.
    * body: Move request
    */
    moveItemToProfile(fromItems: Item[], toItems: Item[], body: IInventoryMoveRequestData): void;
    /**
    * Internal helper function to move item within the same profile_f.
    */
    moveItemInternal(inventoryItems: Item[], body: IInventoryMoveRequestData): void;
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
}
declare namespace InventoryHelper {
    interface InventoryItemHash {
        byItemId: Record<string, Item>;
        byParentId: Record<string, Item[]>;
    }
}
export {};
