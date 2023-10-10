import { ApplicationContext } from "../context/ApplicationContext";
import { PlayerScavGenerator } from "../generators/PlayerScavGenerator";
import { HealthHelper } from "../helpers/HealthHelper";
import { InRaidHelper } from "../helpers/InRaidHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { QuestHelper } from "../helpers/QuestHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { IRegisterPlayerRequestData } from "../models/eft/inRaid/IRegisterPlayerRequestData";
import { ISaveProgressRequestData } from "../models/eft/inRaid/ISaveProgressRequestData";
import { PlayerRaidEndState } from "../models/enums/PlayerRaidEndState";
import { IAirdropConfig } from "../models/spt/config/IAirdropConfig";
import { IInRaidConfig } from "../models/spt/config/IInRaidConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { InsuranceService } from "../services/InsuranceService";
import { MatchBotDetailsCacheService } from "../services/MatchBotDetailsCacheService";
import { PmcChatResponseService } from "../services/PmcChatResponseService";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
/**
 * Logic for handling In Raid callbacks
 */
export declare class InraidController {
    protected logger: ILogger;
    protected saveServer: SaveServer;
    protected jsonUtil: JsonUtil;
    protected timeUtil: TimeUtil;
    protected databaseServer: DatabaseServer;
    protected pmcChatResponseService: PmcChatResponseService;
    protected matchBotDetailsCacheService: MatchBotDetailsCacheService;
    protected questHelper: QuestHelper;
    protected itemHelper: ItemHelper;
    protected profileHelper: ProfileHelper;
    protected playerScavGenerator: PlayerScavGenerator;
    protected healthHelper: HealthHelper;
    protected traderHelper: TraderHelper;
    protected insuranceService: InsuranceService;
    protected inRaidHelper: InRaidHelper;
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;
    protected airdropConfig: IAirdropConfig;
    protected inraidConfig: IInRaidConfig;
    constructor(logger: ILogger, saveServer: SaveServer, jsonUtil: JsonUtil, timeUtil: TimeUtil, databaseServer: DatabaseServer, pmcChatResponseService: PmcChatResponseService, matchBotDetailsCacheService: MatchBotDetailsCacheService, questHelper: QuestHelper, itemHelper: ItemHelper, profileHelper: ProfileHelper, playerScavGenerator: PlayerScavGenerator, healthHelper: HealthHelper, traderHelper: TraderHelper, insuranceService: InsuranceService, inRaidHelper: InRaidHelper, applicationContext: ApplicationContext, configServer: ConfigServer);
    /**
     * Save locationId to active profiles inraid object AND app context
     * @param sessionID Session id
     * @param info Register player request
     */
    addPlayer(sessionID: string, info: IRegisterPlayerRequestData): void;
    /**
     * Handle raid/profile/save
     * Save profile state to disk
     * Handles pmc/pscav
     * @param offraidData post-raid request data
     * @param sessionID Session id
     */
    savePostRaidProgress(offraidData: ISaveProgressRequestData, sessionID: string): void;
    /**
     * Handle updating player profile post-pmc raid
     * @param sessionID session id
     * @param offraidData post-raid data
     */
    protected savePmcProgress(sessionID: string, offraidData: ISaveProgressRequestData): void;
    /**
     * Make changes to pmc profile after they've died in raid,
     * Alter bodypart hp, handle insurance, delete inventory items, remove carried quest items
     * @param postRaidSaveRequest Post-raid save request
     * @param pmcData Pmc profile
     * @param insuranceEnabled Is insurance enabled
     * @param preRaidGear Gear player had before raid
     * @param sessionID Session id
     * @returns Updated profile object
     */
    protected performPostRaidActionsWhenDead(postRaidSaveRequest: ISaveProgressRequestData, pmcData: IPmcData, insuranceEnabled: boolean, preRaidGear: Item[], sessionID: string): IPmcData;
    /**
     * Adjust player characters bodypart hp post-raid
     * @param postRaidSaveRequest post raid data
     * @param pmcData player profile
     */
    protected updatePmcHealthPostRaid(postRaidSaveRequest: ISaveProgressRequestData, pmcData: IPmcData): void;
    /**
     * Reduce body part hp to % of max
     * @param pmcData profile to edit
     * @param multipler multipler to apply to max health
     */
    protected reducePmcHealthToPercent(pmcData: IPmcData, multipler: number): void;
    /**
     * Handle updating the profile post-pscav raid
     * @param sessionID session id
     * @param offraidData post-raid data of raid
     */
    protected savePlayerScavProgress(sessionID: string, offraidData: ISaveProgressRequestData): void;
    /**
     * Is the player dead after a raid - dead is anything other than "survived" / "runner"
     * @param statusOnExit exit value from offraidData object
     * @returns true if dead
     */
    protected isPlayerDead(statusOnExit: PlayerRaidEndState): boolean;
    /**
     * Mark inventory items as FiR if player survived raid, otherwise remove FiR from them
     * @param offraidData Save Progress Request
     */
    protected markOrRemoveFoundInRaidItems(offraidData: ISaveProgressRequestData): void;
    /**
     * Update profile after player completes scav raid
     * @param scavData Scav profile
     * @param sessionID Session id
     * @param offraidData Post-raid save request
     * @param pmcData Pmc profile
     * @param isDead Is player dead
     */
    protected handlePostRaidPlayerScavProcess(scavData: IPmcData, sessionID: string, offraidData: ISaveProgressRequestData, pmcData: IPmcData, isDead: boolean): void;
    /**
     * Update profile with scav karma values based on in-raid actions
     * @param pmcData Pmc profile
     * @param offraidData Post-raid save request
     * @param scavData Scav profile
     * @param sessionID Session id
     */
    protected handlePostRaidPlayerScavKarmaChanges(pmcData: IPmcData, offraidData: ISaveProgressRequestData, scavData: IPmcData, sessionID: string): void;
    /**
     * Get the inraid config from configs/inraid.json
     * @returns InRaid Config
     */
    getInraidConfig(): IInRaidConfig;
    /**
     * Get airdrop config from configs/airdrop.json
     * @returns Airdrop config
     */
    getAirdropConfig(): IAirdropConfig;
}
