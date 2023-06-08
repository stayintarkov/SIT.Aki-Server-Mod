import { DialogueHelper } from "../helpers/DialogueHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { IGetInsuranceCostRequestData } from "../models/eft/insurance/IGetInsuranceCostRequestData";
import { IGetInsuranceCostResponseData } from "../models/eft/insurance/IGetInsuranceCostResponseData";
import { IInsureRequestData } from "../models/eft/insurance/IInsureRequestData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IInsuranceConfig } from "../models/spt/config/IInsuranceConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { InsuranceService } from "../services/InsuranceService";
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
    protected paymentService: PaymentService;
    protected insuranceService: InsuranceService;
    protected configServer: ConfigServer;
    protected insuranceConfig: IInsuranceConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, eventOutputHolder: EventOutputHolder, timeUtil: TimeUtil, saveServer: SaveServer, databaseServer: DatabaseServer, itemHelper: ItemHelper, profileHelper: ProfileHelper, dialogueHelper: DialogueHelper, paymentService: PaymentService, insuranceService: InsuranceService, configServer: ConfigServer);
    /**
     * Process insurance items prior to being given to player in mail
     */
    processReturn(): void;
    /**
     * Should the passed in item be removed from player inventory
     * @param insuredItem Insurued item to roll to lose
     * @param traderId Trader the item was insured by
     * @param itemsBeingDeleted All items to remove from player
     * @returns True if item should be removed
     */
    protected itemShouldBeLost(insuredItem: Item, traderId: string, itemsBeingDeleted: string[]): boolean;
    /**
     * Add insurance to an item
     * @param pmcData Player profile
     * @param body Insurance request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse object to send to client
     */
    insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Calculate insurance cost
     * @param info request object
     * @param sessionID session id
     * @returns IGetInsuranceCostResponseData object to send to client
     */
    cost(info: IGetInsuranceCostRequestData, sessionID: string): IGetInsuranceCostResponseData;
}
