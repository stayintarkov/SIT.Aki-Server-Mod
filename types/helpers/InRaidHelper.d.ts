import { IPmcData } from "../models/eft/common/IPmcData";
import { Victim } from "../models/eft/common/tables/IBotBase";
import { Item } from "../models/eft/common/tables/IItem";
import { ISaveProgressRequestData } from "../models/eft/inRaid/ISaveProgressRequestData";
import { ILostOnDeathConfig } from "../models/spt/config/ILostOnDeathConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { LocalisationService } from "../services/LocalisationService";
import { ProfileFixerService } from "../services/ProfileFixerService";
import { JsonUtil } from "../utils/JsonUtil";
import { InventoryHelper } from "./InventoryHelper";
import { ItemHelper } from "./ItemHelper";
import { PaymentHelper } from "./PaymentHelper";
export declare class InRaidHelper {
    protected logger: ILogger;
    protected saveServer: SaveServer;
    protected jsonUtil: JsonUtil;
    protected itemHelper: ItemHelper;
    protected databaseServer: DatabaseServer;
    protected inventoryHelper: InventoryHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected profileFixerService: ProfileFixerService;
    protected configServer: ConfigServer;
    protected lostOnDeathConfig: ILostOnDeathConfig;
    constructor(logger: ILogger, saveServer: SaveServer, jsonUtil: JsonUtil, itemHelper: ItemHelper, databaseServer: DatabaseServer, inventoryHelper: InventoryHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, profileFixerService: ProfileFixerService, configServer: ConfigServer);
    /**
     * Should quest items be removed from player inventory on death
     * @returns True if items should be removed from inventory
     */
    removeQuestItemsOnDeath(): boolean;
    /**
     * Check an array of items and add an upd object to money items with a stack count of 1
     * Single stack money items have no upd object and thus no StackObjectsCount, causing issues
     * @param items Items array to check
     */
    addUpdToMoneyFromRaid(items: Item[]): void;
    /**
     * Add karma changes up and return the new value
     * @param existingFenceStanding Current fence standing level
     * @param victims Array of kills player performed
     * @returns adjusted karma level after kills are taken into account
     */
    calculateFenceStandingChangeFromKills(existingFenceStanding: number, victims: Victim[]): number;
    /**
     * Get the standing gain/loss for killing an npc
     * @param victim Who was killed by player
     * @returns a numerical standing gain or loss
     */
    protected getStandingChangeForKill(victim: Victim): number;
    /**
     * Reset a profile to a baseline, used post-raid
     * Reset points earned during session property
     * Increment exp
     * Remove Labs keycard
     * @param profileData Profile to update
     * @param saveProgressRequest post raid save data request data
     * @param sessionID Session id
     * @returns Reset profile object
     */
    updateProfileBaseStats(profileData: IPmcData, saveProgressRequest: ISaveProgressRequestData, sessionID: string): IPmcData;
    /**
     * Take body part effects from client profile and apply to server profile
     * @param saveProgressRequest post-raid request
     * @param profileData player profile on server
     */
    protected transferPostRaidLimbEffectsToProfile(saveProgressRequest: ISaveProgressRequestData, profileData: IPmcData): void;
    /**
     * Some maps have one-time-use keys (e.g. Labs
     * Remove the relevant key from an inventory based on the post-raid request data passed in
     * @param offraidData post-raid data
     * @param sessionID Session id
     */
    protected removeMapAccessKey(offraidData: ISaveProgressRequestData, sessionID: string): void;
    /**
     * Set the SPT inraid location Profile property to 'none'
     * @param sessionID Session id
     */
    protected setPlayerInRaidLocationStatusToNone(sessionID: string): void;
    /**
     * Adds SpawnedInSession property to items found in a raid
     * Removes SpawnedInSession for non-scav players if item was taken into raid with SpawnedInSession = true
     * @param preRaidProfile profile to update
     * @param postRaidProfile profile to update inventory contents of
     * @param isPlayerScav Was this a p scav raid
     * @returns profile with FiR items properly tagged
     */
    addSpawnedInSessionPropertyToItems(preRaidProfile: IPmcData, postRaidProfile: IPmcData, isPlayerScav: boolean): IPmcData;
    /**
     * Iterate over inventory items and remove the property that defines an item as Found in Raid
     * Only removes property if item had FiR when entering raid
     * @param postRaidProfile profile to update items for
     * @returns Updated profile with SpawnedInSession removed
     */
    removeSpawnedInSessionPropertyFromItems(postRaidProfile: IPmcData): IPmcData;
    /**
     * Update a players inventory post-raid
     * Remove equipped items from pre-raid
     * Add new items found in raid to profile
     * Store insurance items in profile
     * @param sessionID Session id
     * @param pmcData Profile to update
     * @param postRaidProfile Profile returned by client after a raid
     * @returns Updated profile
     */
    setInventory(sessionID: string, pmcData: IPmcData, postRaidProfile: IPmcData): IPmcData;
    /**
     * Clear pmc inventory of all items except those that are exempt
     * Used post-raid to remove items after death
     * @param pmcData Player profile
     * @param sessionID Session id
     */
    deleteInventory(pmcData: IPmcData, sessionID: string): void;
    /**
     * Get an array of items from a profile that will be lost on death
     * @param pmcProfile Profile to get items from
     * @returns Array of items lost on death
     */
    protected getInventoryItemsLostOnDeath(pmcProfile: IPmcData): Item[];
    /**
     * Get items in vest/pocket/backpack inventory containers (excluding children)
     * @param pmcData Player profile
     * @returns Item array
     */
    protected getBaseItemsInRigPocketAndBackpack(pmcData: IPmcData): Item[];
    /**
     * Does the provided items slotId mean its kept on the player after death
     * @pmcData Player profile
     * @itemToCheck Item to check should be kept
     * @returns true if item is kept after death
     */
    protected isItemKeptAfterDeath(pmcData: IPmcData, itemToCheck: Item): boolean;
    /**
     * Return the equipped items from a players inventory
     * @param items Players inventory to search through
     * @returns an array of equipped items
     */
    getPlayerGear(items: Item[]): Item[];
}
