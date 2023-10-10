import { HttpServerHelper } from "../helpers/HttpServerHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { PreAkiModLoader } from "../loaders/PreAkiModLoader";
import { IChangeRequestData } from "../models/eft/launcher/IChangeRequestData";
import { ILoginRequestData } from "../models/eft/launcher/ILoginRequestData";
import { IRegisterData } from "../models/eft/launcher/IRegisterData";
import { Info, ModDetails } from "../models/eft/profile/IAkiProfile";
import { IConnectResponse } from "../models/eft/profile/IConnectResponse";
import { ICoreConfig } from "../models/spt/config/ICoreConfig";
import { IPackageJsonData } from "../models/spt/mod/IPackageJsonData";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { LocalisationService } from "../services/LocalisationService";
import { HashUtil } from "../utils/HashUtil";
export declare class LauncherController {
    protected hashUtil: HashUtil;
    protected saveServer: SaveServer;
    protected httpServerHelper: HttpServerHelper;
    protected profileHelper: ProfileHelper;
    protected databaseServer: DatabaseServer;
    protected localisationService: LocalisationService;
    protected preAkiModLoader: PreAkiModLoader;
    protected configServer: ConfigServer;
    protected coreConfig: ICoreConfig;
    constructor(hashUtil: HashUtil, saveServer: SaveServer, httpServerHelper: HttpServerHelper, profileHelper: ProfileHelper, databaseServer: DatabaseServer, localisationService: LocalisationService, preAkiModLoader: PreAkiModLoader, configServer: ConfigServer);
    connect(): IConnectResponse;
    /**
     * Get descriptive text for each of the profile edtions a player can choose
     * @returns
     */
    protected getProfileDescriptions(): Record<string, string>;
    find(sessionIdKey: string): Info;
    login(info: ILoginRequestData): string;
    register(info: IRegisterData): string;
    protected createAccount(info: IRegisterData): string;
    changeUsername(info: IChangeRequestData): string;
    changePassword(info: IChangeRequestData): string;
    wipe(info: IRegisterData): string;
    getCompatibleTarkovVersion(): string;
    /**
     * Get the mods the server has currently loaded
     * @returns Dictionary of mod name and mod details
     */
    getLoadedServerMods(): Record<string, IPackageJsonData>;
    /**
     * Get the mods a profile has ever loaded into game with
     * @param sessionId Player id
     * @returns Array of mod details
     */
    getServerModsProfileUsed(sessionId: string): ModDetails[];
}
