import { TradeController } from "@spt-aki/controllers/TradeController";
import { TraderController } from "@spt-aki/controllers/TraderController";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { TradeHelper } from "@spt-aki/helpers/TradeHelper";
import { TraderAssortHelper } from "@spt-aki/helpers/TraderAssortHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IProcessBaseTradeRequestData } from "@spt-aki/models/eft/trade/IProcessBaseTradeRequestData";
import { IProcessBuyTradeRequestData } from "@spt-aki/models/eft/trade/IProcessBuyTradeRequestData";
import { IProcessSellTradeRequestData } from "@spt-aki/models/eft/trade/IProcessSellTradeRequestData";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import fs from "fs";
import path from "path";
import { DependencyContainer } from "tsyringe";
import { BearTrader } from "./BearTrader";
import { CoopGroupTrader } from "./CoopGroupTrader";
import { FluentAssortConstructor } from "./FluentTraderAssortCreator";
import { UsecTrader } from "./UsecTrader";

export class SITCustomTraders implements IPreAkiLoadMod, IPostDBLoadMod
{
    private tradeHelper: TradeHelper;
    private itemHelper: ItemHelper;
    hashUtil: HashUtil;
    fluentTraderAssortCreator: FluentAssortConstructor;
    logger: ILogger;
    public static traders: any[] = [];
    databaseServer: DatabaseServer;
    traderAssortHelper: TraderAssortHelper;

    preAkiLoad(container: DependencyContainer): void {

        this.databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        SITCustomTraders.traders.push(new CoopGroupTrader(), new UsecTrader(), new BearTrader());
        // Initialize Custom Traders
        for(const t of SITCustomTraders.traders) {
            t.preAkiLoad(container);
        }

        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.tradeHelper = container.resolve<TradeHelper>("TradeHelper");
        this.itemHelper = container.resolve<ItemHelper>("ItemHelper");
        this.hashUtil = container.resolve<HashUtil>("HashUtil");
        this.traderAssortHelper = container.resolve<TraderAssortHelper>("TraderAssortHelper");

        this.fluentTraderAssortCreator = new FluentAssortConstructor(this.hashUtil, this.logger);

        container.afterResolution("TradeController", (_t, result: TradeController) => 
        {
            // When the player trades with the Custom Traders, do stuff with the logic
            result.confirmTrading = (pmcData: IPmcData, request: IProcessBaseTradeRequestData, sessionID: string) =>
            {
                console.log("SITCustomTraders...");
                console.log(request);
                console.log("===== <> =====");
                // buying
                if (request.type === "buy_from_trader")
                {
                    const buyData = <IProcessBuyTradeRequestData>request;
                    return this.tradeHelper.buyItem(pmcData, buyData, sessionID, false, null);
                }

                // selling
                if (request.type === "sell_to_trader")
                {
                    const sellData = <IProcessSellTradeRequestData>request;
                    const itemGroups = sellData.items;
                    const traderId = request.tid
                    
                    // If not the CoopTrader, ignore all other logic                    
                    if(traderId !== "coopTrader") 
                        return this.tradeHelper.sellItem(pmcData, sellData, sessionID);



                    // -------------------------------------------
                    // Get Dynamic Assort Path
                    const traderDbPath = path.join( __dirname, traderId);
                    if(!fs.existsSync(traderDbPath))
                        fs.mkdirSync(traderDbPath, { recursive: true });

                    // Create dynamic assort file
                    const dynamicAssortFilePath = path.join(__dirname, traderId, "dynamicAssort.json");
                    if(!fs.existsSync(dynamicAssortFilePath)) {
                        const defaultFile = JSON.stringify([], null, 4);
                        fs.writeFileSync(dynamicAssortFilePath, defaultFile);
                    }
                    // -------------------------------------------

                    const currentAssort:[any] = JSON.parse(fs.readFileSync(dynamicAssortFilePath).toString());

                    for(const itemGroup of itemGroups) {

                        const itemIdToFind = itemGroup.id.replace(/\s+/g, ""); // Strip out whitespace

                        // Find item in player inventory, or show error to player if not found
                        const matchingItemInInventory = pmcData.Inventory.items.find(x => x._id === itemIdToFind);
                        if (!matchingItemInInventory)
                            continue;

                        const childItems = this.itemHelper.findAndReturnChildrenAsItems(pmcData.Inventory.items, itemIdToFind);
                        if (childItems) {
                            // Add all the childItems
                            for(const childItem of childItems) {
                                console.log(childItem);
                                const indexOfExisting = currentAssort.findIndex(x => x["tpl"] == childItem._tpl);

                                let count = childItem.upd !== undefined && childItem.upd?.StackObjectsCount !== undefined ? childItem.upd.StackObjectsCount : 1;

                                if(indexOfExisting == -1) {
                                    currentAssort.push({ tpl: childItem._tpl, count: count });
                                }
                                else {
                                    currentAssort[indexOfExisting]["count"] += count;
                                }
                                
                            }
                        }

                    }

                    fs.writeFileSync(dynamicAssortFilePath, JSON.stringify(currentAssort));

                    // SITCustomTraders.traders[0].createAssort(this.databaseServer);

                    return this.tradeHelper.sellItem(pmcData, sellData, sessionID);
                }

                return null;
            }
            // The modifier Always makes sure this replacement method is ALWAYS replaced
        }, {frequency: "Always"});

        container.afterResolution("TraderController", (_t, result: TraderController) => 
        {
            result.getAssort = (sessionId: string, traderId: string) => {

                if (traderId === "coopTrader") {

                    SITCustomTraders.traders[0].createAssort(this.databaseServer.getTables());

                }

                return this.traderAssortHelper.getAssort(sessionId, traderId);
                
            }
        }, {frequency: "Always"}); 
       
    }

    postDBLoad(container: DependencyContainer): void {
        // Initialize Custom Traders
        for(const t of SITCustomTraders.traders) {
            t.postDBLoad(container);
        }
    }

   
}