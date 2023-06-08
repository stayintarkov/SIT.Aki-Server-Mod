import { ITraderBase } from "../models/eft/common/tables/ITrader";
import { DialogueHelper } from "../helpers/DialogueHelper";
import { HandbookHelper } from "../helpers/HandbookHelper";
import { NotificationSendHelper } from "../helpers/NotificationSendHelper";
import { SecureContainerHelper } from "../helpers/SecureContainerHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { InsuredItem } from "../models/eft/common/tables/IBotBase";
import { Item } from "../models/eft/common/tables/IItem";
import { ISaveProgressRequestData } from "../models/eft/inRaid/ISaveProgressRequestData";
import { IInsuranceConfig } from "../models/spt/config/IInsuranceConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { LocaleService } from "./LocaleService";
import { LocalisationService } from "./LocalisationService";
export declare class InsuranceService {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected secureContainerHelper: SecureContainerHelper;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected traderHelper: TraderHelper;
    protected dialogueHelper: DialogueHelper;
    protected handbookHelper: HandbookHelper;
    protected localisationService: LocalisationService;
    protected localeService: LocaleService;
    protected notificationSendHelper: NotificationSendHelper;
    protected configServer: ConfigServer;
    protected insured: Record<string, Record<string, Item[]>>;
    protected insuranceConfig: IInsuranceConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, secureContainerHelper: SecureContainerHelper, randomUtil: RandomUtil, timeUtil: TimeUtil, saveServer: SaveServer, traderHelper: TraderHelper, dialogueHelper: DialogueHelper, handbookHelper: HandbookHelper, localisationService: LocalisationService, localeService: LocaleService, notificationSendHelper: NotificationSendHelper, configServer: ConfigServer);
    insuranceExists(sessionId: string): boolean;
    insuranceTraderArrayExists(sessionId: string, traderId: string): boolean;
    getInsurance(sessionId: string): Record<string, Item[]>;
    getInsuranceItems(sessionId: string, traderId: string): Item[];
    resetInsurance(sessionId: string): void;
    resetInsuranceTraderArray(sessionId: string, traderId: string): void;
    addInsuranceItemToArray(sessionId: string, traderId: string, itemToAdd: any): void;
    /**
     * Get the rouble price for an item by templateId
     * @param itemTpl item tpl to get handbook price for
     * @returns handbook price in roubles, Return 0 if not found
     */
    getItemPrice(itemTpl: string): number;
    /**
     * Sends stored insured items as message to player
     * @param pmcData profile to modify
     * @param sessionID SessionId of current player
     * @param mapId Id of the map player died/exited that caused the insurance to be issued on
     */
    sendInsuredItems(pmcData: IPmcData, sessionID: string, mapId: string): void;
    /**
     * Send a message to player informing them gear was lost
     * @param sessionID Session id
     */
    sendLostInsuranceMessage(sessionID: string): void;
    protected removeLocationProperty(sessionId: string, traderId: string): void;
    /**
     * Get a timestamp of what insurance items should be sent to player based on the type of trader used to insure
     * @param pmcData Player profile
     * @param trader Trader used to insure items
     * @returns Timestamp to return items to player in seconds
     */
    protected getInsuranceReturnTimestamp(pmcData: IPmcData, trader: ITraderBase): number;
    /**
     * Store lost gear post-raid inside profile
     * @param pmcData player profile to store gear in
     * @param offraidData post-raid request object
     * @param preRaidGear gear player wore prior to raid
     * @param sessionID Session id
     * @param playerDied did the player die in raid
     */
    storeLostGear(pmcData: IPmcData, offraidData: ISaveProgressRequestData, preRaidGear: Item[], sessionID: string, playerDied: boolean): void;
    /**
     * Create a hash table for an array of items, keyed by items _id
     * @param items Items to hash
     * @returns Hashtable
     */
    protected createItemHashTable(items: Item[]): Record<string, Item>;
    /**
     * Add gear item to InsuredItems array in player profile
     * @param pmcData profile to store item in
     * @param insuredItem Item to store in profile
     * @param actualItem item to store
     * @param sessionID Session id
     */
    protected addGearToSend(pmcData: IPmcData, insuredItem: InsuredItem, actualItem: Item, sessionID: string): void;
    getPremium(pmcData: IPmcData, inventoryItem: Item, traderId: string): number;
}
