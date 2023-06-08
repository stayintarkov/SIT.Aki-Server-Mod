import { I18n } from "i18n";
import { ILocaleConfig } from "../models/spt/config/ILocaleConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { LocaleService } from "./LocaleService";
/**
 * Handles translating server text into different langauges
 */
export declare class LocalisationService {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected localeService: LocaleService;
    protected localeConfig: ILocaleConfig;
    protected i18n: I18n;
    constructor(logger: ILogger, databaseServer: DatabaseServer, localeService: LocaleService);
    /**
     * Get a localised value using the passed in key
     * @param key Key to loop up locale for
     * @param args optional arguments
     * @returns Localised string
     */
    getText(key: string, args?: any): string;
    /**
     * Get all locale keys
     * @returns string array of keys
     */
    getKeys(): string[];
}
