import { IBotBase } from "../models/eft/common/tables/IBotBase";
import { ILogger } from "../models/spt/utils/ILogger";
/** Cache bots in a dictionary, keyed by the bots name, keying by name isnt idea as its not unique but this is used by the post-raid system which doesnt have any bot ids, only name */
export declare class MatchBotDetailsCacheService {
    protected logger: ILogger;
    protected botDetailsCache: Record<string, IBotBase>;
    constructor(logger: ILogger);
    /**
     * Store a bot in the cache, keyed by its name
     * @param botToCache Bot details to cache
     */
    cacheBot(botToCache: IBotBase): void;
    /**
     * Clean the cache of all bot details
     */
    clearCache(): void;
    /**
     * Find a bot in the cache by its name
     * @param botName Name of bot to find
     * @returns Bot details
     */
    getBotByName(botName: string): IBotBase;
}
