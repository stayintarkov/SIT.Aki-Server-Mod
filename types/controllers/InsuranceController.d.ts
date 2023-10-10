import { DialogueHelper } from "../helpers/DialogueHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { IGetInsuranceCostRequestData } from "../models/eft/insurance/IGetInsuranceCostRequestData";
import { IGetInsuranceCostResponseData } from "../models/eft/insurance/IGetInsuranceCostResponseData";
import { IInsureRequestData } from "../models/eft/insurance/IInsureRequestData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { Insurance } from "../models/eft/profile/IAkiProfile";
import { IInsuranceConfig } from "../models/spt/config/IInsuranceConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { InsuranceService } from "../services/InsuranceService";
import { MailSendService } from "../services/MailSendService";
import { PaymentService } from "../services/PaymentService";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class InsuranceController {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected profileHelper: ProfileHelper;
    protected dialogueHelper: DialogueHelper;
    protected traderHelper: TraderHelper;
    protected paymentService: PaymentService;
    protected insuranceService: InsuranceService;
    protected mailSendService: MailSendService;
    protected configServer: ConfigServer;
    protected insuranceConfig: IInsuranceConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, eventOutputHolder: EventOutputHolder, timeUtil: TimeUtil, saveServer: SaveServer, databaseServer: DatabaseServer, itemHelper: ItemHelper, profileHelper: ProfileHelper, dialogueHelper: DialogueHelper, traderHelper: TraderHelper, paymentService: PaymentService, insuranceService: InsuranceService, mailSendService: MailSendService, configServer: ConfigServer);
    /**
     * Process insurance items of all profiles prior to being given back to the player through the mail service.
     *
     * @returns void
    */
    processReturn(): void;
    /**
     * Process insurance items of a single profile prior to being given back to the player through the mail service.
     *
     * @returns void
    */
    processReturnByProfile(sessionID: string): void;
    /**
     * Get all insured items that are ready to be processed in a specific profile.
     *
     * @param sessionID Session ID of the profile to check.
     * @param time The time to check ready status against. Current time by default.
     * @returns All insured items that are ready to be processed.
     */
    protected filterInsuredItems(sessionID: string, time?: number): Insurance[];
    /**
     * This method orchestrates the processing of insured items in a profile.
     *
     * @param insuranceDetails The insured items to process.
     * @param sessionID The session ID that should receive the processed items.
     * @returns void
     */
    protected processInsuredItems(insuranceDetails: Insurance[], sessionID: string): void;
    /**
     * Build an array of items to delete from the insured items.
     *
     * This method orchestrates several steps:
     *  - Filters items based on their presence in the database and their raid moddability.
     *  - Sorts base and independent child items to consider for deletion.
     *  - Groups child items by their parent for later evaluation.
     *  - Evaluates grouped child items to decide which should be deleted, based on their value and a random roll.
     *
     * @param insured - The insured items to build a removal array from.
     * @returns An array of IDs representing items that should be deleted.
     */
    protected findItemsToDelete(insured: Insurance): string[];
    /**
     * Filters an item based on its existence in the database, raid moddability, and slot requirements.
     *
     * @param item The item to be filtered.
     * @param parentItemDbDetails The database details of the parent item, or null if the item has no parent.
     * @param itemDbDetails A tuple where the first element is a boolean indicating if the item exists in the database,
     *                      and the second element is the item details if it does.
     * @returns true if the item exists in the database and neither of the following conditions are met:
     *           - The item has the RaidModdable property set to false.
     *           - The item is attached to a required slot in its parent item.
     *          Otherwise, returns false.
     */
    protected filterByRaidModdability(item: Item, parentItemDbDetails: ITemplateItem | null, itemDbDetails: [boolean, ITemplateItem]): boolean;
    /**
     * Determines if an item is either a base item or a child item that is not equipped to its parent.
     *
     * @param item The item to check.
     * @returns true if the item is a base or an independent child item, otherwise false.
     */
    protected isBaseOrIndependentChild(item: Item): boolean;
    /**
     * Makes a roll to determine if a given item should be deleted. If the roll is successful, the item's ID is added
     * to the `toDelete` array.
     *
     * @param item The item for which the roll is made.
     * @param traderId The ID of the trader to consider in the rollForItemDelete method.
     * @param toDelete The array accumulating the IDs of items to be deleted.
     * @returns true if the item is marked for deletion, otherwise false.
     */
    protected makeRollAndMarkForDeletion(item: Item, traderId: string, toDelete: string[]): boolean;
    /**
     * Groups child items by their parent IDs in a Map data structure.
     *
     * @param item The child item to be grouped by its parent.
     * @param childrenGroupedByParent The Map that holds arrays of children items grouped by their parent IDs.
     * @returns void
     */
    protected groupChildrenByParent(item: Item, childrenGroupedByParent: Map<string, Item[]>): void;
    /**
     * Sorts the array of children items in descending order by their maximum price. For each child, a roll is made to
     * determine if it should be deleted. The method then deletes the most valuable children based on the number of
     * successful rolls made.
     *
     * @param children The array of children items to sort and filter.
     * @param traderId The ID of the trader to consider in the rollForItemDelete method.
     * @param toDelete The array that accumulates the IDs of the items to be deleted.
     * @returns void
     */
    protected sortAndFilterChildren(children: Item[], traderId: string, toDelete: string[]): void;
    /**
     * Remove items from the insured items that should not be returned to the player.
     *
     * @param insured The insured items to process.
     * @param toDelete The items that should be deleted.
     * @returns void
     */
    protected removeItemsFromInsurance(insured: Insurance, toDelete: string[]): void;
    /**
     * Handle sending the insurance message to the user that potentially contains the valid insurance items.
     *
     * @param sessionID The session ID that should receive the insurance message.
     * @param insurance The context of insurance to use.
     * @param noItems Whether or not there are any items to return to the player.
     * @returns void
     */
    protected sendMail(sessionID: string, insurance: Insurance, noItems: boolean): void;
    /**
     * Determines whether a valid insured item should be removed from the player's inventory based on a random roll and
     * trader-specific return chance.
     *
     * @param insuredItem The insured item being evaluated for removal.
     * @param traderId The ID of the trader who insured the item.
     * @param itemsBeingDeleted List of items that are already slated for removal.
     * @returns true if the insured item should be removed from inventory, false otherwise.
     */
    protected rollForItemDelete(insuredItem: Item, traderId: string, itemsBeingDeleted: string[]): boolean;
    /**
     * Handle Insure event
     * Add insurance to an item
     *
     * @param pmcData Player profile
     * @param body Insurance request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse object to send to client
     */
    insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle client/insurance/items/list/cost
     * Calculate insurance cost
     *
     * @param request request object
     * @param sessionID session id
     * @returns IGetInsuranceCostResponseData object to send to client
     */
    cost(request: IGetInsuranceCostRequestData, sessionID: string): IGetInsuranceCostResponseData;
}
