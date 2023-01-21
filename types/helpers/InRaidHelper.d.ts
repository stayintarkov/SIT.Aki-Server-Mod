import { IPmcData } from "../models/eft/common/IPmcData";
import { Victim } from "../models/eft/common/tables/IBotBase";
import { Item } from "../models/eft/common/tables/IItem";
import { ISaveProgressRequestData } from "../models/eft/inRaid/ISaveProgressRequestData";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { LocalisationService } from "../services/LocalisationService";
import { ProfileFixerService } from "../services/ProfileFixerService";
import { JsonUtil } from "../utils/JsonUtil";
import { InventoryHelper } from "./InventoryHelper";
import { PaymentHelper } from "./PaymentHelper";
export declare class InRaidHelper {
    protected logger: ILogger;
    protected saveServer: SaveServer;
    protected jsonUtil: JsonUtil;
    protected databaseServer: DatabaseServer;
    protected inventoryHelper: InventoryHelper;
    protected paymentHelper: PaymentHelper;
    protected localisationService: LocalisationService;
    protected profileFixerService: ProfileFixerService;
    constructor(logger: ILogger, saveServer: SaveServer, jsonUtil: JsonUtil, databaseServer: DatabaseServer, inventoryHelper: InventoryHelper, paymentHelper: PaymentHelper, localisationService: LocalisationService, profileFixerService: ProfileFixerService);
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
     * Reset a profile to a baseline, used post-raid
     * Reset points earned during session property
     * Increment exp
     * Remove Labs keycard
     * @param profileData Profile to update
     * @param saveProgressRequest post raid save data request data
     * @param sessionID Sessino id
     * @returns Reset profile object
     */
    updateProfileBaseStats(profileData: IPmcData, saveProgressRequest: ISaveProgressRequestData, sessionID: string): IPmcData;
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
     * @param postRaidProfile profile to upate inventory contents of
     * @param isPlayerScav Was this a p scav raid
     * @returns
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
     * @param sessionID
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
     * @returns Player profile with pmc inventory cleared
     */
    deleteInventory(pmcData: IPmcData, sessionID: string): IPmcData;
    /**
     * Does the provided items slotId mean its kept on the player after death
     * @param slotId slotid of item to check
     * @returns true if item is kept after death
     */
    isItemKeptAfterDeath(slotId: string): boolean;
    /**
     * Return the equipped items from a players inventory
     * @param items Players inventory to search through
     * @returns an array of equipped items
     */
    getPlayerGear(items: Item[]): Item[];
}
