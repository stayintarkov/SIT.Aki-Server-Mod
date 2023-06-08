import { ApplicationContext } from "../context/ApplicationContext";
import { HideoutHelper } from "../helpers/HideoutHelper";
import { HttpServerHelper } from "../helpers/HttpServerHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { PreAkiModLoader } from "../loaders/PreAkiModLoader";
import { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
import { IPmcData } from "../models/eft/common/IPmcData";
import { ICheckVersionResponse } from "../models/eft/game/ICheckVersionResponse";
import { ICurrentGroupResponse } from "../models/eft/game/ICurrentGroupResponse";
import { IGameConfigResponse } from "../models/eft/game/IGameConfigResponse";
import { IServerDetails } from "../models/eft/game/IServerDetails";
import { IAkiProfile } from "../models/eft/profile/IAkiProfile";
import { ICoreConfig } from "../models/spt/config/ICoreConfig";
import { IHttpConfig } from "../models/spt/config/IHttpConfig";
import { ILocationConfig } from "../models/spt/config/ILocationConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { CustomLocationWaveService } from "../services/CustomLocationWaveService";
import { LocalisationService } from "../services/LocalisationService";
import { OpenZoneService } from "../services/OpenZoneService";
import { ProfileFixerService } from "../services/ProfileFixerService";
import { SeasonalEventService } from "../services/SeasonalEventService";
import { EncodingUtil } from "../utils/EncodingUtil";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class GameController {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected jsonUtil: JsonUtil;
    protected timeUtil: TimeUtil;
    protected preAkiModLoader: PreAkiModLoader;
    protected httpServerHelper: HttpServerHelper;
    protected encodingUtil: EncodingUtil;
    protected hideoutHelper: HideoutHelper;
    protected profileHelper: ProfileHelper;
    protected profileFixerService: ProfileFixerService;
    protected localisationService: LocalisationService;
    protected customLocationWaveService: CustomLocationWaveService;
    protected openZoneService: OpenZoneService;
    protected seasonalEventService: SeasonalEventService;
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;
    protected os: any;
    protected httpConfig: IHttpConfig;
    protected coreConfig: ICoreConfig;
    protected locationConfig: ILocationConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, jsonUtil: JsonUtil, timeUtil: TimeUtil, preAkiModLoader: PreAkiModLoader, httpServerHelper: HttpServerHelper, encodingUtil: EncodingUtil, hideoutHelper: HideoutHelper, profileHelper: ProfileHelper, profileFixerService: ProfileFixerService, localisationService: LocalisationService, customLocationWaveService: CustomLocationWaveService, openZoneService: OpenZoneService, seasonalEventService: SeasonalEventService, applicationContext: ApplicationContext, configServer: ConfigServer);
    gameStart(_url: string, _info: IEmptyRequestData, sessionID: string, startTimeStampMS: number): void;
    /**
     * BSG have two values for shotgun dispersion, we make sure both have the same value
     */
    protected fixShotgunDispersions(): void;
    /**
     * Players set botReload to a high value and don't expect the crazy fast reload speeds, give them a warn about it
     * @param pmcProfile Player profile
     */
    protected warnOnActiveBotReloadSkill(pmcProfile: IPmcData): void;
    /**
     * When player logs in, iterate over all active effects and reduce timer
     * TODO - add body part HP regen
     * @param pmcProfile
     */
    protected updateProfileHealthValues(pmcProfile: IPmcData): void;
    /**
     * Waves with an identical min/max values spawn nothing, the number of bots that spawn is the difference between min and max
     */
    protected fixBrokenOfflineMapWaves(): void;
    /**
     * Make Rogues spawn later to allow for scavs to spawn first instead of rogues filling up all spawn positions
     */
    protected fixRoguesSpawningInstantlyOnLighthouse(): void;
    /**
     * Find and split waves with large numbers of bots into smaller waves - BSG appears to reduce the size of these waves to one bot when they're waiting to spawn for too long
     */
    protected splitBotWavesIntoSingleWaves(): void;
    /**
     * Get a list of installed mods and save their details to the profile being used
     * @param fullProfile Profile to add mod details to
     */
    protected saveActiveModsToProfile(fullProfile: IAkiProfile): void;
    /**
     * Add the logged in players name to PMC name pool
     * @param pmcProfile
     */
    protected addPlayerToPMCNames(pmcProfile: IPmcData): void;
    /**
     * Blank out the "test" mail message from prapor
     */
    protected removePraporTestMessage(): void;
    /**
     * Make non-trigger-spawned raiders spawn earlier + always
     */
    protected adjustLabsRaiderSpawnRate(): void;
    protected logProfileDetails(fullProfile: IAkiProfile): void;
    getGameConfig(sessionID: string): IGameConfigResponse;
    getServer(): IServerDetails[];
    getCurrentGroup(sessionId: string): ICurrentGroupResponse;
    getValidGameVersion(): ICheckVersionResponse;
}
