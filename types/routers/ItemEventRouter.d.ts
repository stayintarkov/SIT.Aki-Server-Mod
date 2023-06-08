import { ItemEventRouterDefinition } from "../di/Router";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { IItemEventRouterRequest } from "../models/eft/itemEvent/IItemEventRouterRequest";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { ILogger } from "../models/spt/utils/ILogger";
import { LocalisationService } from "../services/LocalisationService";
import { EventOutputHolder } from "./EventOutputHolder";
export declare class ItemEventRouter {
    protected logger: ILogger;
    protected profileHelper: ProfileHelper;
    protected itemEventRouters: ItemEventRouterDefinition[];
    protected localisationService: LocalisationService;
    protected eventOutputHolder: EventOutputHolder;
    constructor(logger: ILogger, profileHelper: ProfileHelper, itemEventRouters: ItemEventRouterDefinition[], localisationService: LocalisationService, eventOutputHolder: EventOutputHolder);
    /**
     *
     * @param info Event request
     * @param sessionID Session id
     * @returns Item response
     */
    handleEvents(info: IItemEventRouterRequest, sessionID: string): IItemEventRouterResponse;
}
