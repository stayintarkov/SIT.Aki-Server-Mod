import { FenceBaseAssortGenerator } from "../generators/FenceBaseAssortGenerator";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { TraderAssortHelper } from "../helpers/TraderAssortHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IBarterScheme, ITraderAssort, ITraderBase } from "../models/eft/common/tables/ITrader";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { FenceService } from "../services/FenceService";
import { TraderAssortService } from "../services/TraderAssortService";
import { TraderPurchasePersisterService } from "../services/TraderPurchasePersisterService";
import { JsonUtil } from "../utils/JsonUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class TraderController {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected traderAssortHelper: TraderAssortHelper;
    protected profileHelper: ProfileHelper;
    protected traderHelper: TraderHelper;
    protected timeUtil: TimeUtil;
    protected traderAssortService: TraderAssortService;
    protected traderPurchasePersisterService: TraderPurchasePersisterService;
    protected fenceService: FenceService;
    protected fenceBaseAssortGenerator: FenceBaseAssortGenerator;
    protected jsonUtil: JsonUtil;
    constructor(logger: ILogger, databaseServer: DatabaseServer, traderAssortHelper: TraderAssortHelper, profileHelper: ProfileHelper, traderHelper: TraderHelper, timeUtil: TimeUtil, traderAssortService: TraderAssortService, traderPurchasePersisterService: TraderPurchasePersisterService, fenceService: FenceService, fenceBaseAssortGenerator: FenceBaseAssortGenerator, jsonUtil: JsonUtil);
    /**
     * Runs when onLoad event is fired
     * Iterate over traders, ensure an unmolested copy of their assorts is stored in traderAssortService
     * Store timestamp of next assort refresh in nextResupply property of traders .base object
     */
    load(): void;
    /**
     * Runs when onUpdate is fired
     * If current time is > nextResupply(expire) time of trader, refresh traders assorts and
     * Fence is handled slightly differently
     * @returns has run
     */
    update(): boolean;
    /**
     * Return an array of all traders
     * @param sessionID Session id
     * @returns array if ITraderBase objects
     */
    getAllTraders(sessionID: string): ITraderBase[];
    getTrader(sessionID: string, traderID: string): ITraderBase;
    getAssort(sessionId: string, traderId: string): ITraderAssort;
    getPurchasesData(sessionID: string, traderID: string): Record<string, IBarterScheme[][]>;
}
