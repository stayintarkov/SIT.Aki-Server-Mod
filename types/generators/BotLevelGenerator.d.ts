import { MinMax } from "../models/common/MinMax";
import { IRandomisedBotLevelResult } from "../models/eft/bot/IRandomisedBotLevelResult";
import { IExpTable } from "../models/eft/common/IGlobals";
import { IBotBase } from "../models/eft/common/tables/IBotBase";
import { BotGenerationDetails } from "../models/spt/bots/BotGenerationDetails";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { RandomUtil } from "../utils/RandomUtil";
export declare class BotLevelGenerator {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseServer: DatabaseServer);
    /**
     * Return a randomised bot level and exp value
     * @param levelDetails min and max of level for bot
     * @param botGenerationDetails Deatils to help generate a bot
     * @param bot being level is being generated for
     * @returns IRandomisedBotLevelResult object
     */
    generateBotLevel(levelDetails: MinMax, botGenerationDetails: BotGenerationDetails, bot: IBotBase): IRandomisedBotLevelResult;
    /**
     * Get the highest level a bot can be relative to the players level, but no futher than the max size from globals.exp_table
     * @param playerLevel Players current level
     * @param relativeDeltaMax max delta above player level to go
     * @returns highest level possible for bot
     */
    protected getHighestRelativeBotLevel(playerLevel: number, relativeDeltaMax: number, levelDetails: MinMax, expTable: IExpTable[]): number;
}
