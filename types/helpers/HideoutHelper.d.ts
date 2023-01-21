import { IPmcData } from "../models/eft/common/IPmcData";
import { Common, HideoutArea, Production, Productive } from "../models/eft/common/tables/IBotBase";
import { Upd } from "../models/eft/common/tables/IItem";
import { StageBonus } from "../models/eft/hideout/IHideoutArea";
import { IHideoutContinousProductionStartRequestData } from "../models/eft/hideout/IHideoutContinousProductionStartRequestData";
import { IHideoutSingleProductionStartRequestData } from "../models/eft/hideout/IHideoutSingleProductionStartRequestData";
import { IHideoutTakeProductionRequestData } from "../models/eft/hideout/IHideoutTakeProductionRequestData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IHideoutConfig } from "../models/spt/config/IHideoutConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocalisationService } from "../services/LocalisationService";
import { PlayerService } from "../services/PlayerService";
import { HashUtil } from "../utils/HashUtil";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
import { InventoryHelper } from "./InventoryHelper";
import { ProfileHelper } from "./ProfileHelper";
export declare class HideoutHelper {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    protected eventOutputHolder: EventOutputHolder;
    protected httpResponse: HttpResponseUtil;
    protected profileHelper: ProfileHelper;
    protected inventoryHelper: InventoryHelper;
    protected playerService: PlayerService;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    static bitcoinFarm: string;
    static waterCollector: string;
    static bitcoin: string;
    static expeditionaryFuelTank: string;
    protected hideoutConfig: IHideoutConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, randomUtil: RandomUtil, databaseServer: DatabaseServer, eventOutputHolder: EventOutputHolder, httpResponse: HttpResponseUtil, profileHelper: ProfileHelper, inventoryHelper: InventoryHelper, playerService: PlayerService, localisationService: LocalisationService, configServer: ConfigServer);
    registerProduction(pmcData: IPmcData, body: IHideoutSingleProductionStartRequestData | IHideoutContinousProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * This convinience function intialies new Production Object
     * with all the constants.
     */
    initProduction(recipeId: string, productionTime: number): Production;
    isProductionType(productive: Productive): productive is Production;
    applyPlayerUpgradesBonuses(pmcData: IPmcData, bonus: StageBonus): void;
    /**
     * TODO:
     * After looking at the skills there doesnt seem to be a configuration per skill to boost
     * the XP gain PER skill. I THINK you should be able to put the variable "SkillProgress" (just like health has it)
     * and be able to tune the skill gain PER skill, but I havent tested it and Im not sure!
     * @param pmcData
     * @param bonus
     */
    protected applySkillXPBoost(pmcData: IPmcData, bonus: StageBonus): void;
    /**
     * Process a players hideout, update areas that use resources + increment production timers
     * @param sessionID Session id
     */
    updatePlayerHideout(sessionID: string): void;
    /**
     * Update progress timer for water collector
     * @param pmcData profile to update
     * @param productionId id of water collection production to update
     * @param hideoutProperties Hideout properties
     */
    protected updateWaterCollectorProductionTimer(pmcData: IPmcData, productionId: string, hideoutProperties: {
        btcFarmCGs?: number;
        isGeneratorOn: boolean;
        waterCollectorHasFilter: boolean;
    }): void;
    /**
     * Iterate over productions and update their progress timers
     * @param pmcData Profile to check for productions and update
     * @param hideoutProperties Hideout properties
     */
    protected updateProductionTimers(pmcData: IPmcData, hideoutProperties: {
        btcFarmCGs: number;
        isGeneratorOn: boolean;
        waterCollectorHasFilter: boolean;
    }): void;
    /**
     * Update progress timer for scav case
     * @param pmcData Profile to update
     * @param productionId Id of scav case production to update
     */
    protected updateScavCaseProductionTimer(pmcData: IPmcData, productionId: string): void;
    /**
     * Iterate over hideout areas that use resources (fuel/filters etc) and update associated values
     * @param sessionID Session id
     * @param pmcData Profile to update areas of
     * @param hideoutProperties hideout properties
     */
    protected updateAreasWithResources(sessionID: string, pmcData: IPmcData, hideoutProperties: {
        btcFarmCGs: number;
        isGeneratorOn: boolean;
        waterCollectorHasFilter: boolean;
    }): void;
    protected updateWaterCollector(sessionId: string, pmcData: IPmcData, area: HideoutArea, isGeneratorOn: boolean): void;
    protected doesWaterCollectorHaveFilter(waterCollector: HideoutArea): boolean;
    protected updateFuel(generatorArea: HideoutArea, pmcData: IPmcData): void;
    /**
     * Adjust water filter objects resourceValue or delete when they reach 0 resource
     * @param waterFilterArea water filter area to update
     * @param production production object
     * @param isGeneratorOn is generatory enabled
     * @param pmcData Player profile
     * @returns Updated HideoutArea object
     */
    protected updateWaterFilters(waterFilterArea: HideoutArea, production: Production, isGeneratorOn: boolean, pmcData: IPmcData): HideoutArea;
    protected getAreaUpdObject(stackCount: number, resourceValue: number, resourceUnitsConsumed: number): Upd;
    protected updateAirFilters(airFilterArea: HideoutArea, pmcData: IPmcData): void;
    protected updateBitcoinFarm(pmcData: IPmcData, btcFarmCGs: number, isGeneratorOn: boolean): Production;
    protected getBTCSlots(pmcData: IPmcData): number;
    protected getManagementSkillsSlots(): number;
    protected hasManagementSkillSlots(pmcData: IPmcData): boolean;
    protected getHideoutManagementSkill(pmcData: IPmcData): Common;
    protected getHideoutManagementConsumptionBonus(pmcData: IPmcData): number;
    isProduction(productive: Productive): productive is Production;
    getBTC(pmcData: IPmcData, body: IHideoutTakeProductionRequestData, sessionID: string): IItemEventRouterResponse;
}
