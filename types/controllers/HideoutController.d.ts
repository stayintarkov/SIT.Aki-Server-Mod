import { ScavCaseRewardGenerator } from "../generators/ScavCaseRewardGenerator";
import { HideoutHelper } from "../helpers/HideoutHelper";
import { InventoryHelper } from "../helpers/InventoryHelper";
import { PaymentHelper } from "../helpers/PaymentHelper";
import { PresetHelper } from "../helpers/PresetHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { HideoutArea, Product } from "../models/eft/common/tables/IBotBase";
import { HideoutUpgradeCompleteRequestData } from "../models/eft/hideout/HideoutUpgradeCompleteRequestData";
import { IHideoutContinousProductionStartRequestData } from "../models/eft/hideout/IHideoutContinousProductionStartRequestData";
import { IHideoutProduction } from "../models/eft/hideout/IHideoutProduction";
import { IHideoutPutItemInRequestData } from "../models/eft/hideout/IHideoutPutItemInRequestData";
import { IHideoutScavCaseStartRequestData } from "../models/eft/hideout/IHideoutScavCaseStartRequestData";
import { IHideoutSingleProductionStartRequestData } from "../models/eft/hideout/IHideoutSingleProductionStartRequestData";
import { IHideoutTakeItemOutRequestData } from "../models/eft/hideout/IHideoutTakeItemOutRequestData";
import { IHideoutTakeProductionRequestData } from "../models/eft/hideout/IHideoutTakeProductionRequestData";
import { IHideoutToggleAreaRequestData } from "../models/eft/hideout/IHideoutToggleAreaRequestData";
import { IHideoutUpgradeRequestData } from "../models/eft/hideout/IHideoutUpgradeRequestData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IHideoutConfig } from "../models/spt/config/IHideoutConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { LocalisationService } from "../services/LocalisationService";
import { PlayerService } from "../services/PlayerService";
import { HashUtil } from "../utils/HashUtil";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class HideoutController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected databaseServer: DatabaseServer;
    protected randomUtil: RandomUtil;
    protected inventoryHelper: InventoryHelper;
    protected saveServer: SaveServer;
    protected playerService: PlayerService;
    protected presetHelper: PresetHelper;
    protected paymentHelper: PaymentHelper;
    protected eventOutputHolder: EventOutputHolder;
    protected httpResponse: HttpResponseUtil;
    protected profileHelper: ProfileHelper;
    protected hideoutHelper: HideoutHelper;
    protected scavCaseRewardGenerator: ScavCaseRewardGenerator;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected jsonUtil: JsonUtil;
    protected static nameBackendCountersCrafting: string;
    protected hideoutConfig: IHideoutConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, timeUtil: TimeUtil, databaseServer: DatabaseServer, randomUtil: RandomUtil, inventoryHelper: InventoryHelper, saveServer: SaveServer, playerService: PlayerService, presetHelper: PresetHelper, paymentHelper: PaymentHelper, eventOutputHolder: EventOutputHolder, httpResponse: HttpResponseUtil, profileHelper: ProfileHelper, hideoutHelper: HideoutHelper, scavCaseRewardGenerator: ScavCaseRewardGenerator, localisationService: LocalisationService, configServer: ConfigServer, jsonUtil: JsonUtil);
    upgrade(pmcData: IPmcData, body: IHideoutUpgradeRequestData, sessionID: string): IItemEventRouterResponse;
    upgradeComplete(pmcData: IPmcData, body: HideoutUpgradeCompleteRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Create item in hideout slot item array, remove item from player inventory
     * @param pmcData Profile data
     * @param addItemToHideoutRequest reqeust from client to place item in area slot
     * @param sessionID Session id
     * @returns IItemEventRouterResponse object
     */
    putItemsInAreaSlots(pmcData: IPmcData, addItemToHideoutRequest: IHideoutPutItemInRequestData, sessionID: string): IItemEventRouterResponse;
    takeItemsFromAreaSlots(pmcData: IPmcData, body: IHideoutTakeItemOutRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Find resource item in hideout area, add copy to player inventory, remove Item from hideout slot
     * @param sessionID Session id
     * @param pmcData Profile to update
     * @param removeResourceRequest client request
     * @param output response to send to client
     * @param hideoutArea Area fuel is being removed from
     * @returns IItemEventRouterResponse response
     */
    protected removeResourceFromArea(sessionID: string, pmcData: IPmcData, removeResourceRequest: IHideoutTakeItemOutRequestData, output: IItemEventRouterResponse, hideoutArea: HideoutArea): IItemEventRouterResponse;
    toggleArea(pmcData: IPmcData, body: IHideoutToggleAreaRequestData, sessionID: string): IItemEventRouterResponse;
    singleProductionStart(pmcData: IPmcData, body: IHideoutSingleProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handles event after clicking 'start' on the scav case hideout page
     * @param pmcData player profile
     * @param body client request object
     * @param sessionID session id
     * @returns item event router response
     */
    scavCaseProductionStart(pmcData: IPmcData, body: IHideoutScavCaseStartRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Add generated scav case rewards to player profile
     * @param pmcData player profile to add rewards to
     * @param rewards reward items to add to profile
     */
    protected addScavCaseRewardsToProfile(pmcData: IPmcData, rewards: Product[]): void;
    continuousProductionStart(pmcData: IPmcData, body: IHideoutContinousProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    takeProduction(pmcData: IPmcData, body: IHideoutTakeProductionRequestData, sessionID: string): IItemEventRouterResponse;
    protected handleRecipie(sessionID: string, recipe: IHideoutProduction, pmcData: IPmcData, body: IHideoutTakeProductionRequestData, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Handles giving rewards stored in player profile to player after clicking 'get rewards'
     * @param sessionID
     * @param pmcData
     * @param body
     * @param output
     * @returns
     */
    protected handleScavCase(sessionID: string, pmcData: IPmcData, body: IHideoutTakeProductionRequestData, output: IItemEventRouterResponse): IItemEventRouterResponse;
    registerProduction(pmcData: IPmcData, body: IHideoutSingleProductionStartRequestData | IHideoutContinousProductionStartRequestData, sessionID: string): IItemEventRouterResponse;
    update(): void;
}
