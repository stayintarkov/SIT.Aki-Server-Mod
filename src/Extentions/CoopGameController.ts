import { inject, injectable } from "tsyringe";

import { GameController } from "@spt-aki/controllers/GameController";
import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { ContextVariableType } from "@spt-aki/context/ContextVariableType";
import { HideoutHelper } from "@spt-aki/helpers/HideoutHelper";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { ILooseLoot } from "@spt-aki/models/eft/common/ILooseLoot";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { BodyPartHealth } from "@spt-aki/models/eft/common/tables/IBotBase";
import { ICheckVersionResponse } from "@spt-aki/models/eft/game/ICheckVersionResponse";
import { ICurrentGroupResponse } from "@spt-aki/models/eft/game/ICurrentGroupResponse";
import { IGameConfigResponse } from "@spt-aki/models/eft/game/IGameConfigResponse";
import { IGameKeepAliveResponse } from "@spt-aki/models/eft/game/IGameKeepAliveResponse";
import { IServerDetails } from "@spt-aki/models/eft/game/IServerDetails";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
import { AccountTypes } from "@spt-aki/models/enums/AccountTypes";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { SkillTypes } from "@spt-aki/models/enums/SkillTypes";
import { Traders } from "@spt-aki/models/enums/Traders";
import { ICoreConfig } from "@spt-aki/models/spt/config/ICoreConfig";
import { IHttpConfig } from "@spt-aki/models/spt/config/IHttpConfig";
import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { ILootConfig } from "@spt-aki/models/spt/config/ILootConfig";
import { IPmcConfig } from "@spt-aki/models/spt/config/IPmcConfig";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ILocationData } from "@spt-aki/models/spt/server/ILocations";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { CustomLocationWaveService } from "@spt-aki/services/CustomLocationWaveService";
import { GiftService } from "@spt-aki/services/GiftService";
import { ItemBaseClassService } from "@spt-aki/services/ItemBaseClassService";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { OpenZoneService } from "@spt-aki/services/OpenZoneService";
import { ProfileFixerService } from "@spt-aki/services/ProfileFixerService";
import { SeasonalEventService } from "@spt-aki/services/SeasonalEventService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
import { RaidTimeAdjustmentService } from "@spt-aki/services/RaidTimeAdjustmentService";

@injectable()
export class CoopGameController extends GameController
{
    protected static sessionBackendUrl: Record<string, string> = {};
    
    constructor
    (
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("TimeUtil") protected timeUtil: TimeUtil,
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("PreAkiModLoader") protected preAkiModLoader: PreAkiModLoader,
        @inject("HttpServerHelper") protected httpServerHelper: HttpServerHelper,
        @inject("RandomUtil") protected randomUtil: RandomUtil,
        @inject("HideoutHelper") protected hideoutHelper: HideoutHelper,
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("ProfileFixerService") protected profileFixerService: ProfileFixerService,
        @inject("LocalisationService") protected localisationService: LocalisationService,
        @inject("CustomLocationWaveService") protected customLocationWaveService: CustomLocationWaveService,
        @inject("OpenZoneService") protected openZoneService: OpenZoneService,
        @inject("SeasonalEventService") protected seasonalEventService: SeasonalEventService,
        @inject("ItemBaseClassService") protected itemBaseClassService: ItemBaseClassService,
        @inject("GiftService") protected giftService: GiftService,
        @inject("RaidTimeAdjustmentService") protected raidTimeAdjustmentService: RaidTimeAdjustmentService,
        @inject("ApplicationContext") protected applicationContext: ApplicationContext,
        @inject("ConfigServer") protected configServer: ConfigServer
    )
    {
        super(logger
            , databaseServer
            , jsonUtil
            , timeUtil
            , hashUtil
            , preAkiModLoader
            , httpServerHelper
            , randomUtil
            , hideoutHelper
            , profileHelper
            , profileFixerService
            , localisationService
            , customLocationWaveService
            , openZoneService
            , seasonalEventService
            , itemBaseClassService
            , giftService
            , raidTimeAdjustmentService
            , applicationContext
            , configServer)
    }

    public setSessionBackendUrl(sessionID: string, backendUrl: string): void
    {
        this.logger.info("setSessionBackendUrl, Backend URL: " + backendUrl)
        CoopGameController.sessionBackendUrl[sessionID] = backendUrl;
    }

    public override getGameConfig(sessionID: string): IGameConfigResponse
    {
        const backendUrl = CoopGameController.sessionBackendUrl[sessionID];
        delete CoopGameController.sessionBackendUrl[sessionID];
        this.logger.info("GetConfig, Backend URL: " + backendUrl)

        const profile = this.profileHelper.getPmcProfile(sessionID);

        const config: IGameConfigResponse = {
            languages: this.databaseServer.getTables().locales.languages,
            ndaFree: false,
            reportAvailable: false,
            twitchEventMember: false,
            lang: "en",
            aid: profile.aid,
            taxonomy: 6,
            activeProfileId: `pmc${sessionID}`,
            backend: {
                Lobby: backendUrl,
                Trading: backendUrl,
                Messaging: backendUrl,
                Main: backendUrl,
                RagFair: backendUrl,
            },
            useProtobuf: false,
            utc_time: new Date().getTime() / 1000,
            totalInGame: profile.Stats?.Eft?.TotalInGameTime ?? 0
        };

        return config;
    }
    
    public override gameStart(_url: string, _info: IEmptyRequestData, sessionID: string, startTimeStampMS: number): void
    {
        const today = new Date().toUTCString();
        const startTimeStampMS1 = Date.parse(today);

        this.logger.info("gameStart, cachedIndexedTimestamp: " 
        + sessionID + ", " 
        + startTimeStampMS1)
        this.applicationContext.addValue(ContextVariableType.CLIENT_START_TIMESTAMP, { sessionId: sessionID, timestamp: startTimeStampMS1 });
        
        super.gameStart(_url, _info, sessionID, startTimeStampMS1);
    }
}