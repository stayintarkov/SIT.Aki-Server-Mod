import { ProfileHelper } from "../helpers/ProfileHelper";
import { TraderPurchaseData } from "../models/eft/profile/IAkiProfile";
import { ITraderConfig } from "../models/spt/config/ITraderConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { TimeUtil } from "../utils/TimeUtil";
/**
 * Help with storing limited item purchases from traders in profile to persist them over server restarts
 */
export declare class TraderPurchasePersisterService {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected profileHelper: ProfileHelper;
    protected configServer: ConfigServer;
    protected traderConfig: ITraderConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, profileHelper: ProfileHelper, configServer: ConfigServer);
    /**
     * Get the purchases made from a trader for this profile before the last trader reset
     * @param sessionId Session id
     * @param traderId Trader to loop up purchases for
     * @returns Dict of assort id and count purchased
     */
    getProfileTraderPurchases(sessionId: string, traderId: string): Record<string, TraderPurchaseData>;
    /**
     * Remove all trader purchase records from all profiles that exist
     * @param traderId Traders id
     */
    resetTraderPurchasesStoredInProfile(traderId: string): void;
    /**
     * Iterate over all server profiles and remove specific trader purchase data that has passed the trader refesh time
     * @param traderId Trader id
     */
    removeStalePurchasesFromProfiles(traderId: string): void;
}
