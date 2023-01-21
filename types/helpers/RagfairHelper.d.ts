import { Item } from "../models/eft/common/tables/IItem";
import { ITraderAssort } from "../models/eft/common/tables/ITrader";
import { IGetOffersResult } from "../models/eft/ragfair/IGetOffersResult";
import { ISearchRequestData } from "../models/eft/ragfair/ISearchRequestData";
import { IRagfairConfig } from "../models/spt/config/IRagfairConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { RagfairLinkedItemService } from "../services/RagfairLinkedItemService";
import { JsonUtil } from "../utils/JsonUtil";
import { HandbookHelper } from "./HandbookHelper";
import { ItemHelper } from "./ItemHelper";
import { TraderAssortHelper } from "./TraderAssortHelper";
import { UtilityHelper } from "./UtilityHelper";
export declare class RagfairHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected traderAssortHelper: TraderAssortHelper;
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    protected itemHelper: ItemHelper;
    protected ragfairLinkedItemService: RagfairLinkedItemService;
    protected utilityHelper: UtilityHelper;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, traderAssortHelper: TraderAssortHelper, databaseServer: DatabaseServer, handbookHelper: HandbookHelper, itemHelper: ItemHelper, ragfairLinkedItemService: RagfairLinkedItemService, utilityHelper: UtilityHelper, configServer: ConfigServer);
    /**
    * Gets currency TAG from TPL
    * @param {string} currency
    * @returns string
    */
    getCurrencyTag(currency: string): string;
    filterCategories(sessionID: string, info: ISearchRequestData): string[];
    getDisplayableAssorts(sessionID: string): Record<string, ITraderAssort>;
    protected getCategoryList(handbookId: string): string[];
    countCategories(result: IGetOffersResult): void;
    /**
     * Merges Root Items
     * Ragfair allows abnormally large stacks.
     */
    mergeStackable(items: Item[]): Item[];
    getCurrencySymbol(currencyTpl: string): string;
}
