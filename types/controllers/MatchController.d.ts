import { ApplicationContext } from "../context/ApplicationContext";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { ICreateGroupRequestData } from "../models/eft/match/ICreateGroupRequestData";
import { IEndOfflineRaidRequestData } from "../models/eft/match/IEndOfflineRaidRequestData";
import { IGetGroupStatusRequestData } from "../models/eft/match/IGetGroupStatusRequestData";
import { IGetProfileRequestData } from "../models/eft/match/IGetProfileRequestData";
import { IJoinMatchRequestData } from "../models/eft/match/IJoinMatchRequestData";
import { IJoinMatchResult } from "../models/eft/match/IJoinMatchResult";
import { IStartOfflineRaidRequestData } from "../models/eft/match/IStartOffineRaidRequestData";
import { BotDifficulty } from "../models/enums/BotDifficulty";
import { IBotConfig } from "../models/spt/config/IBotConfig";
import { IInRaidConfig } from "../models/spt/config/IInRaidConfig";
import { IMatchConfig } from "../models/spt/config/IMatchConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { SaveServer } from "../servers/SaveServer";
import { BotGenerationCacheService } from "../services/BotGenerationCacheService";
import { BotLootCacheService } from "../services/BotLootCacheService";
import { CustomLocationWaveService } from "../services/CustomLocationWaveService";
import { MatchLocationService } from "../services/MatchLocationService";
import { OpenZoneService } from "../services/OpenZoneService";
import { ProfileSnapshotService } from "../services/ProfileSnapshotService";
export declare class MatchController {
    protected logger: ILogger;
    protected saveServer: SaveServer;
    protected profileHelper: ProfileHelper;
    protected matchLocationService: MatchLocationService;
    protected traderHelper: TraderHelper;
    protected botLootCacheService: BotLootCacheService;
    protected configServer: ConfigServer;
    protected profileSnapshotService: ProfileSnapshotService;
    protected customLocationWaveService: CustomLocationWaveService;
    protected openZoneService: OpenZoneService;
    protected botGenerationCacheService: BotGenerationCacheService;
    protected applicationContext: ApplicationContext;
    protected matchConfig: IMatchConfig;
    protected inraidConfig: IInRaidConfig;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, saveServer: SaveServer, profileHelper: ProfileHelper, matchLocationService: MatchLocationService, traderHelper: TraderHelper, botLootCacheService: BotLootCacheService, configServer: ConfigServer, profileSnapshotService: ProfileSnapshotService, customLocationWaveService: CustomLocationWaveService, openZoneService: OpenZoneService, botGenerationCacheService: BotGenerationCacheService, applicationContext: ApplicationContext);
    getEnabled(): boolean;
    getProfile(info: IGetProfileRequestData): IPmcData[];
    createGroup(sessionID: string, info: ICreateGroupRequestData): any;
    deleteGroup(info: any): void;
    joinMatch(info: IJoinMatchRequestData, sessionID: string): IJoinMatchResult[];
    protected getMatch(location: string): any;
    getGroupStatus(info: IGetGroupStatusRequestData): any;
    startOfflineRaid(info: IStartOfflineRaidRequestData, sessionID: string): void;
    /**
     * Convert a difficulty value from pre-raid screen to a bot difficulty
     * @param botDifficulty dropdown difficulty
     * @returns bot difficulty
     */
    protected convertDifficultyDropdownIntoBotDifficulty(botDifficulty: BotDifficulty): string;
    endOfflineRaid(info: IEndOfflineRaidRequestData, sessionID: string): void;
}
