import { HideoutController } from "../controllers/HideoutController";
import { RagfairController } from "../controllers/RagfairController";
import { IEmptyRequestData } from "../models/eft/common/IEmptyRequestData";
import { IGlobals } from "../models/eft/common/IGlobals";
import { ICustomizationItem } from "../models/eft/common/tables/ICustomizationItem";
import { IHandbookBase } from "../models/eft/common/tables/IHandbookBase";
import { IQuest } from "../models/eft/common/tables/IQuest";
import { IGetItemPricesResponse } from "../models/eft/game/IGetItemPricesResponse";
import { IHideoutArea } from "../models/eft/hideout/IHideoutArea";
import { IHideoutProduction } from "../models/eft/hideout/IHideoutProduction";
import { IHideoutScavCase } from "../models/eft/hideout/IHideoutScavCase";
import { IHideoutSettingsBase } from "../models/eft/hideout/IHideoutSettingsBase";
import { IGetBodyResponseData } from "../models/eft/httpResponse/IGetBodyResponseData";
import { ISettingsBase } from "../models/spt/server/ISettingsBase";
import { DatabaseServer } from "../servers/DatabaseServer";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
/**
 * Handle client requests
 */
export declare class DataCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected databaseServer: DatabaseServer;
    protected ragfairController: RagfairController;
    protected hideoutController: HideoutController;
    constructor(httpResponse: HttpResponseUtil, databaseServer: DatabaseServer, ragfairController: RagfairController, hideoutController: HideoutController);
    /**
     * Handles client/settings
     * @returns ISettingsBase
     */
    getSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ISettingsBase>;
    /**
     * Handles client/globals
     * @returns IGlobals
     */
    getGlobals(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGlobals>;
    /**
     * Handles client/items
     * @returns string
     */
    getTemplateItems(url: string, info: IEmptyRequestData, sessionID: string): string;
    /**
     * Handles client/handbook/templates
     * @returns IHandbookBase
     */
    getTemplateHandbook(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHandbookBase>;
    /**
     * Handles client/customization
     * @returns Record<string, ICustomizationItem
     */
    getTemplateSuits(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<Record<string, ICustomizationItem>>;
    /**
     * Handles client/account/customization
     * @returns string[]
     */
    getTemplateCharacter(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<string[]>;
    getTemplateQuests(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IQuest[]>;
    getHideoutSettings(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutSettingsBase>;
    getHideoutAreas(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutArea[]>;
    gethideoutProduction(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutProduction[]>;
    getHideoutScavcase(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IHideoutScavCase[]>;
    getLocalesLanguages(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<Record<string, string>>;
    getLocalesMenu(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<string>;
    getLocalesGlobal(url: string, info: IEmptyRequestData, sessionID: string): string;
    /**
     * Handle client/hideout/qte/list
     */
    getQteList(url: string, info: IEmptyRequestData, sessionID: string): string;
    /**
     * Handle client/items/prices/
     * Called when viewing a traders assorts
     * TODO -  fully implement this
     */
    getItemPrices(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGetItemPricesResponse>;
}
