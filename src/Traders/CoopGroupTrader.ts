import { DependencyContainer } from "tsyringe";

// SPT types
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";

// New trader settings
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { Money } from "@spt-aki/models/enums/Money";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import fs from "fs";
import path from "path";
import * as baseJson from "../../Traders/db/CoopGroupTraderBase.json";
import { FluentAssortConstructor } from "./FluentTraderAssortCreator";
import { TraderHelper } from "./traderHelpers";

export class CoopGroupTrader implements IPreAkiLoadMod, IPostDBLoadMod
{
    private mod: string
    private logger: ILogger
    private traderHelper: TraderHelper
    private fluentTraderAssortHelper: FluentAssortConstructor;
    private traderId = "coopTrader";
    itemHelper: ItemHelper;

    constructor() {
        this.mod = "SITCoop"; // Set name of mod so we can log it to console later
    }

    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param container Dependency container
     */
    public preAkiLoad(container: DependencyContainer): void
    {
        // Get a logger
        this.logger = container.resolve<ILogger>("WinstonLogger");

        // Get SPT code/data we need later
        const preAkiModLoader: PreAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const imageRouter: ImageRouter = container.resolve<ImageRouter>("ImageRouter");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig: ITraderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const hashUtil: HashUtil = container.resolve<HashUtil>("HashUtil");
        
        this.itemHelper = container.resolve<ItemHelper>("ItemHelper");

        // Create helper class and use it to register our traders image/icon + set its stock refresh time
        this.traderHelper = new TraderHelper();
        this.fluentTraderAssortHelper = new FluentAssortConstructor(hashUtil, this.logger);
        this.traderHelper.registerProfileImage(baseJson, this.mod, preAkiModLoader, imageRouter, "coop.jpg");
        this.traderHelper.setTraderUpdateTime(traderConfig, baseJson, 3600);


    }
    
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     * @param container Dependency container
     */
    public postDBLoad(container: DependencyContainer): void
    {
        // Resolve SPT classes we'll use
        const databaseServer: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const configServer: ConfigServer = container.resolve<ConfigServer>("ConfigServer");
        const jsonUtil: JsonUtil = container.resolve<JsonUtil>("JsonUtil");

        // Get a reference to the database tables
        const tables = databaseServer.getTables();

        // Add new trader to the trader dictionary in DatabaseServer - has no assorts (items) yet
        this.traderHelper.addTraderToDb(baseJson, tables, jsonUtil);

        // const MILK_ID = "575146b724597720a27126d5"; // Can find item ids in `database\templates\items.json` or with https://db.sp-tarkov.com/search
        // this.fluentTraderAssortHelper.createSingleAssortItem(MILK_ID)
        //                             .addStackCount(200)
        //                             .addBuyRestriction(10)
        //                             .addMoneyCost(Money.ROUBLES, 2000)
        //                             .addLoyaltyLevel(1)
        //                             .export(tables.traders[baseJson._id]);

        this.createAssort(databaseServer.getTables());
        // this.fluentTraderAssortHelper.createComplexAssortItem()

        // Add more complex items to trader (items with sub-items, e.g. guns)
        // this.traderHelper.addComplexItemsToTrader(tables, baseJson._id, jsonUtil);

        // Add trader to locale file, ensures trader text shows properly on screen
        // WARNING: adds the same text to ALL locales (e.g. chinese/french/english)
        this.traderHelper.addTraderToLocales(baseJson, tables, baseJson.name, "Coop Trader", baseJson.nickname, baseJson.location, "");

    }

    public createAssort(databaseServerTables:any): void {

        // -------------------------------------------
        // Get Dynamic Assort Path
        const traderDbPath = path.join( __dirname, this.traderId);
        if(!fs.existsSync(traderDbPath))
            fs.mkdirSync(traderDbPath, { recursive: true });

        // Create dynamic assort file
        const dynamicAssortFilePath = path.join(__dirname, this.traderId, "dynamicAssort.json");
        if(!fs.existsSync(dynamicAssortFilePath)) {
            const defaultFile = JSON.stringify([], null, 4);
            fs.writeFileSync(dynamicAssortFilePath, defaultFile);
        }
        // -------------------------------------------

        // --------------------------------------------------------
        // Empty out the tables!
        databaseServerTables.traders[baseJson._id].assort.barter_scheme = {};
        databaseServerTables.traders[baseJson._id].assort.items = [];
        databaseServerTables.traders[baseJson._id].assort.loyal_level_items = {};
        
        const currentAssort:[any] = JSON.parse(fs.readFileSync(dynamicAssortFilePath).toString());
        for(const item of currentAssort) {
            
            this.fluentTraderAssortHelper.createSingleAssortItem(item["tpl"])
            .addStackCount(item["count"])
            .addMoneyCost(Money.ROUBLES, this.itemHelper.getItemPrice(item["tpl"]))
            .addLoyaltyLevel(1)
            .export(databaseServerTables.traders[baseJson._id]);
        }
    }
}