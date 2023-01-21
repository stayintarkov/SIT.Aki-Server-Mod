import { InventoryHelper } from "../helpers/InventoryHelper";
import { PaymentHelper } from "../helpers/PaymentHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { WeightedRandomHelper } from "../helpers/WeightedRandomHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IAddItemRequestData } from "../models/eft/inventory/IAddItemRequestData";
import { IInventoryBindRequestData } from "../models/eft/inventory/IInventoryBindRequestData";
import { IInventoryCreateMarkerRequestData } from "../models/eft/inventory/IInventoryCreateMarkerRequestData";
import { IInventoryDeleteMarkerRequestData } from "../models/eft/inventory/IInventoryDeleteMarkerRequestData";
import { IInventoryEditMarkerRequestData } from "../models/eft/inventory/IInventoryEditMarkerRequestData";
import { IInventoryExamineRequestData } from "../models/eft/inventory/IInventoryExamineRequestData";
import { IInventoryFoldRequestData } from "../models/eft/inventory/IInventoryFoldRequestData";
import { IInventoryMergeRequestData } from "../models/eft/inventory/IInventoryMergeRequestData";
import { IInventoryMoveRequestData } from "../models/eft/inventory/IInventoryMoveRequestData";
import { IInventoryReadEncyclopediaRequestData } from "../models/eft/inventory/IInventoryReadEncyclopediaRequestData";
import { IInventoryRemoveRequestData } from "../models/eft/inventory/IInventoryRemoveRequestData";
import { IInventorySortRequestData } from "../models/eft/inventory/IInventorySortRequestData";
import { IInventorySplitRequestData } from "../models/eft/inventory/IInventorySplitRequestData";
import { IInventorySwapRequestData } from "../models/eft/inventory/IInventorySwapRequestData";
import { IInventoryTagRequestData } from "../models/eft/inventory/IInventoryTagRequestData";
import { IInventoryToggleRequestData } from "../models/eft/inventory/IInventoryToggleRequestData";
import { IInventoryTransferRequestData } from "../models/eft/inventory/IInventoryTransferRequestData";
import { IOpenRandomLootContainerRequestData } from "../models/eft/inventory/IOpenRandomLootContainerRequestData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { DatabaseServer } from "../servers/DatabaseServer";
import { FenceService } from "../services/FenceService";
import { LocalisationService } from "../services/LocalisationService";
import { RagfairOfferService } from "../services/RagfairOfferService";
import { HashUtil } from "../utils/HashUtil";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { RandomUtil } from "../utils/RandomUtil";
export declare class InventoryController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected jsonUtil: JsonUtil;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    protected fenceService: FenceService;
    protected presetHelper: PresetHelper;
    protected inventoryHelper: InventoryHelper;
    protected ragfairOfferService: RagfairOfferService;
    protected profileHelper: ProfileHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected eventOutputHolder: EventOutputHolder;
    protected httpResponseUtil: HttpResponseUtil;
    constructor(logger: ILogger, hashUtil: HashUtil, jsonUtil: JsonUtil, randomUtil: RandomUtil, databaseServer: DatabaseServer, fenceService: FenceService, presetHelper: PresetHelper, inventoryHelper: InventoryHelper, ragfairOfferService: RagfairOfferService, profileHelper: ProfileHelper, weightedRandomHelper: WeightedRandomHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, eventOutputHolder: EventOutputHolder, httpResponseUtil: HttpResponseUtil);
    /**
    * Move Item
    * change location of item with parentId and slotId
    * transfers items from one profile to another if fromOwner/toOwner is set in the body.
    * otherwise, move is contained within the same profile_f.
     * @param pmcData Profile
     * @param moveRequest Move request data
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    moveItem(pmcData: IPmcData, moveRequest: IInventoryMoveRequestData, sessionID: string): IItemEventRouterResponse;
    /**
    * Remove Item from Profile
    * Deep tree item deletion, also removes items from insurance list
    */
    removeItem(pmcData: IPmcData, itemId: string, sessionID: string, output?: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Implements functionality "Discard" from Main menu (Stash etc.)
     * Removes item from PMC Profile
     */
    discardItem(pmcData: IPmcData, body: IInventoryRemoveRequestData, sessionID: string): IItemEventRouterResponse;
    /**
    * Split Item
    * spliting 1 item-stack into 2 separate items ...
    */
    splitItem(pmcData: IPmcData, body: IInventorySplitRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Merge Item
     * merges 2 items into one, deletes item from `body.item` and adding number of stacks into `body.with`
     */
    mergeItem(pmcData: IPmcData, body: IInventoryMergeRequestData, sessionID: string): IItemEventRouterResponse;
    /**
    * Transfer item
    * Used to take items from scav inventory into stash or to insert ammo into mags (shotgun ones) and reloading weapon by clicking "Reload"
    */
    transferItem(pmcData: IPmcData, body: IInventoryTransferRequestData, sessionID: string): IItemEventRouterResponse;
    /**
    * Swap Item
    * its used for "reload" if you have weapon in hands and magazine is somewhere else in rig or backpack in equipment
    */
    swapItem(pmcData: IPmcData, body: IInventorySwapRequestData, sessionID: string): IItemEventRouterResponse;
    /**
    * Give Item
    * its used for "add" item like gifts etc.
    */
    addItem(pmcData: IPmcData, body: IAddItemRequestData, output: IItemEventRouterResponse, sessionID: string, callback: any, foundInRaid?: boolean, addUpd?: any): IItemEventRouterResponse;
    /**
     * Handles folding of Weapons
     */
    foldItem(pmcData: IPmcData, body: IInventoryFoldRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Toggles "Toggleable" items like night vision goggles and face shields.
     */
    toggleItem(pmcData: IPmcData, body: IInventoryToggleRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Add a tag to an inventory item
     * @param pmcData profile with item to add tag to
     * @param body tag request data
     * @param sessionID session id
     * @returns client response object
     */
    tagItem(pmcData: IPmcData, body: IInventoryTagRequestData, sessionID: string): IItemEventRouterResponse;
    bindItem(pmcData: IPmcData, body: IInventoryBindRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handles examining an item
     * @param pmcData player profile
     * @param body request object
     * @param sessionID session id
     * @returns response
     */
    examineItem(pmcData: IPmcData, body: IInventoryExamineRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Get the tplid of an item from the examine request object
     * @param body response request
     * @returns tplid
     */
    protected getExaminedItemTpl(body: IInventoryExamineRequestData): string;
    readEncyclopedia(pmcData: IPmcData, body: IInventoryReadEncyclopediaRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handles sorting of Inventory.
     */
    sortInventory(pmcData: IPmcData, body: IInventorySortRequestData, sessionID: string): IItemEventRouterResponse;
    createMapMarker(pmcData: IPmcData, body: IInventoryCreateMarkerRequestData, sessionID: string): IItemEventRouterResponse;
    deleteMapMarker(pmcData: IPmcData, body: IInventoryDeleteMarkerRequestData, sessionID: string): IItemEventRouterResponse;
    editMapMarker(pmcData: IPmcData, body: IInventoryEditMarkerRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle event fired when a container is unpacked (currently only the halloween pumpkin)
     * @param pmcData Profile data
     * @param body open loot container request data
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    openRandomLootContainer(pmcData: IPmcData, body: IOpenRandomLootContainerRequestData, sessionID: string): IItemEventRouterResponse;
}
