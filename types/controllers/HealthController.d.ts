import { HealthHelper } from "../helpers/HealthHelper";
import { InventoryHelper } from "../helpers/InventoryHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IHealthTreatmentRequestData } from "../models/eft/health/IHealthTreatmentRequestData";
import { IOffraidEatRequestData } from "../models/eft/health/IOffraidEatRequestData";
import { IOffraidHealRequestData } from "../models/eft/health/IOffraidHealRequestData";
import { ISyncHealthRequestData } from "../models/eft/health/ISyncHealthRequestData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { LocalisationService } from "../services/LocalisationService";
import { PaymentService } from "../services/PaymentService";
export declare class HealthController {
    protected logger: ILogger;
    protected eventOutputHolder: EventOutputHolder;
    protected itemHelper: ItemHelper;
    protected paymentService: PaymentService;
    protected inventoryHelper: InventoryHelper;
    protected localisationService: LocalisationService;
    protected healthHelper: HealthHelper;
    constructor(logger: ILogger, eventOutputHolder: EventOutputHolder, itemHelper: ItemHelper, paymentService: PaymentService, inventoryHelper: InventoryHelper, localisationService: LocalisationService, healthHelper: HealthHelper);
    /**
     * stores in-raid player health
     * @param pmcData Player profile
     * @param info Request data
     * @param sessionID
     * @param addEffects Should effects found be added or removed from profile
     */
    saveVitality(pmcData: IPmcData, info: ISyncHealthRequestData, sessionID: string, addEffects?: boolean, deleteExistingEffects?: boolean): void;
    /**
     * When healing in menu
     * @param pmcData
     * @param body
     * @param sessionID
     * @returns
     */
    offraidHeal(pmcData: IPmcData, body: IOffraidHealRequestData, sessionID: string): IItemEventRouterResponse;
    offraidEat(pmcData: IPmcData, body: IOffraidEatRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Occurs on post-raid healing page
     * @param pmcData player profile
     * @param healthTreatmentRequest Request data from client
     * @param sessionID Session id
     * @returns
     */
    healthTreatment(pmcData: IPmcData, healthTreatmentRequest: IHealthTreatmentRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * iterate over treatment request diff and find effects to remove from player limbs
     * @param sessionId
     * @param profile Profile to update
     * @param treatmentRequest client request
     */
    protected removeEffectsAfterPostRaidHeal(sessionId: string, profile: IPmcData, treatmentRequest: IHealthTreatmentRequestData): void;
}
