import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { DatabaseServer } from "../servers/DatabaseServer";
import { RagfairPriceService } from "../services/RagfairPriceService";
import { ItemHelper } from "./ItemHelper";
import { ILogger } from "../models/spt/utils/ILogger";
export declare class RagfairTaxHelper {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected ragfairPriceService: RagfairPriceService;
    protected itemHelper: ItemHelper;
    constructor(logger: ILogger, databaseServer: DatabaseServer, ragfairPriceService: RagfairPriceService, itemHelper: ItemHelper);
    calculateTax(item: Item, pmcData: IPmcData, requirementsValue: number, offerItemCount: number, sellInOnePiece: boolean): number;
    protected calculateItemWorth(item: Item, itemTemplate: ITemplateItem, itemCount: number, pmcData: IPmcData, isRootItem?: boolean): number;
}
