import { LootGenerator } from "../generators/LootGenerator";
import { InventoryHelper } from "../helpers/InventoryHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { PaymentHelper } from "../helpers/PaymentHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { QuestHelper } from "../helpers/QuestHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
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
    protected itemHelper: ItemHelper;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    protected fenceService: FenceService;
    protected presetHelper: PresetHelper;
    protected inventoryHelper: InventoryHelper;
    protected questHelper: QuestHelper;
    protected ragfairOfferService: RagfairOfferService;
    protected profileHelper: ProfileHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected lootGenerator: LootGenerator;
    protected eventOutputHolder: EventOutputHolder;
    protected httpResponseUtil: HttpResponseUtil;
    constructor(logger: ILogger, hashUtil: HashUtil, jsonUtil: JsonUtil, itemHelper: ItemHelper, randomUtil: RandomUtil, databaseServer: DatabaseServer, fenceService: FenceService, presetHelper: PresetHelper, inventoryHelper: InventoryHelper, questHelper: QuestHelper, ragfairOfferService: RagfairOfferService, profileHelper: ProfileHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, lootGenerator: LootGenerator, eventOutputHolder: EventOutputHolder, httpResponseUtil: HttpResponseUtil);
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
     * Get a event router response with inventory trader message
     * @param output Item event router response
     * @returns Item event router response
     */
    protected getTraderExploitErrorResponse(output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
    * Remove Item from Profile
    * Deep tree item deletion, also removes items from insurance list
    */
    removeItem(pmcData: IPmcData, itemId: string, sessionID: string, output?: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Handle Remove event
     * Implements functionality "Discard" from Main menu (Stash etc.)
     * Removes item from PMC Profile
     */
    discardItem(pmcData: IPmcData, body: IInventoryRemoveRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Split Item
     * spliting 1 stack into 2
     * @param pmcData Player profile (unused, getOwnerInventoryItems() gets profile)
     * @param request Split request
     * @param sessionID Session/player id
     * @returns IItemEventRouterResponse
     */
    splitItem(pmcData: IPmcData, request: IInventorySplitRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Fully merge 2 inventory stacks together into one stack (merging where both stacks remain is called 'transfer')
     * Deletes item from `body.item` and adding number of stacks into `body.with`
     * @param pmcData Player profile (unused, getOwnerInventoryItems() gets profile)
     * @param body Merge request
     * @param sessionID Player id
     * @returns IItemEventRouterResponse
     */
    mergeItem(pmcData: IPmcData, body: IInventoryMergeRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * TODO: Adds no data to output to send to client, is this by design?
     * TODO: should make use of getOwnerInventoryItems(), stack being transferred may not always be on pmc
     * Transfer items from one stack into another while keeping original stack
     * Used to take items from scav inventory into stash or to insert ammo into mags (shotgun ones) and reloading weapon by clicking "Reload"
     * @param pmcData Player profile
     * @param body Transfer request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    transferItem(pmcData: IPmcData, body: IInventoryTransferRequestData, sessionID: string): IItemEventRouterResponse;
    /**
    * Swap Item
    * its used for "reload" if you have weapon in hands and magazine is somewhere else in rig or backpack in equipment
    * Also used to swap items using quick selection on character screen
    */
    swapItem(pmcData: IPmcData, request: IInventorySwapRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handles folding of Weapons
     */
    foldItem(pmcData: IPmcData, body: IInventoryFoldRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Toggles "Toggleable" items like night vision goggles and face shields.
     * @param pmcData player profile
     * @param body Toggle request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
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
    /**
     * Bind an inventory item to the quick access menu at bottom of player screen
     * @param pmcData Player profile
     * @param bindRequest Reqeust object
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    bindItem(pmcData: IPmcData, bindRequest: IInventoryBindRequestData, sessionID: string): IItemEventRouterResponse;
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
     * Handle ApplyInventoryChanges
     * Sorts supplied items.
     * @param pmcData Player profile
     * @param request sort request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    sortInventory(pmcData: IPmcData, request: IInventorySortRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Add note to a map
     * @param pmcData Player profile
     * @param request Add marker request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    createMapMarker(pmcData: IPmcData, request: IInventoryCreateMarkerRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Delete a map marker
     * @param pmcData Player profile
     * @param request Delete marker request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    deleteMapMarker(pmcData: IPmcData, request: IInventoryDeleteMarkerRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Edit an existing map marker
     * @param pmcData Player profile
     * @param request Edit marker request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    editMapMarker(pmcData: IPmcData, request: IInventoryEditMarkerRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Strip out characters from note string that are not: letter/numbers/unicode/spaces
     * @param mapNoteText Marker text to sanitise
     * @returns Sanitised map marker text
     */
    protected sanitiseMapMarkerText(mapNoteText: string): string;
    /**
     * Handle OpenRandomLootContainer event
     * Handle event fired when a container is unpacked (currently only the halloween pumpkin)
     * @param pmcData Profile data
     * @param body open loot container request data
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    openRandomLootContainer(pmcData: IPmcData, body: IOpenRandomLootContainerRequestData, sessionID: string): IItemEventRouterResponse;
}
