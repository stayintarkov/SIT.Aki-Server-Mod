import { RagfairServer } from "../servers/RagfairServer";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { TradeHelper } from "../helpers/TradeHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { IProcessRagfairTradeRequestData } from "../models/eft/trade/IProcessRagfairTradeRequestData";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { Upd } from "../models/eft/common/tables/IItem";
import { IProcessBaseTradeRequestData } from "../models/eft/trade/IProcessBaseTradeRequestData";
import { EventOutputHolder } from "../routers/EventOutputHolder";
import { ILogger } from "../models/spt/utils/ILogger";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
declare class TradeController {
    protected logger: ILogger;
    protected eventOutputHolder: EventOutputHolder;
    protected tradeHelper: TradeHelper;
    protected profileHelper: ProfileHelper;
    protected ragfairServer: RagfairServer;
    protected httpResponse: HttpResponseUtil;
    constructor(logger: ILogger, eventOutputHolder: EventOutputHolder, tradeHelper: TradeHelper, profileHelper: ProfileHelper, ragfairServer: RagfairServer, httpResponse: HttpResponseUtil);
    confirmTrading(pmcData: IPmcData, body: IProcessBaseTradeRequestData, sessionID: string, foundInRaid?: boolean, upd?: Upd): IItemEventRouterResponse;
    confirmRagfairTrading(pmcData: IPmcData, body: IProcessRagfairTradeRequestData, sessionID: string): IItemEventRouterResponse;
}
export { TradeController };
