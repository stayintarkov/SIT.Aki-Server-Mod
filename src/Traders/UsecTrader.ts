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
import * as baseJson from "../../Traders/db/UsecTraderBase.json";
import { TraderHelper } from "./traderHelpers";

export class UsecTrader implements IPreAkiLoadMod, IPostDBLoadMod
{
    private mod: string
    private logger: ILogger
    private traderHeper: TraderHelper

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

        // Create helper class and use it to register our traders image/icon + set its stock refresh time
        this.traderHeper = new TraderHelper();
        this.traderHeper.registerProfileImage(baseJson, this.mod, preAkiModLoader, imageRouter, "usec.jpg");
        this.traderHeper.setTraderUpdateTime(traderConfig, baseJson, 3600);

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
        this.traderHeper.addTraderToDb(baseJson, tables, jsonUtil);

        // Add some singular items to trader (items without sub-items e.g. milk/bandage)
        this.traderHeper.addSingleItemsToTrader(tables, baseJson._id);

        // Add more complex items to trader (items with sub-items, e.g. guns)
        this.traderHeper.addComplexItemsToTrader(tables, baseJson._id, jsonUtil);

        // Add trader to locale file, ensures trader text shows properly on screen
        // WARNING: adds the same text to ALL locales (e.g. chinese/french/english)
        this.traderHeper.addTraderToLocales(baseJson, tables, baseJson.name, "Usec Trader", baseJson.nickname, baseJson.location, "");
    }
}