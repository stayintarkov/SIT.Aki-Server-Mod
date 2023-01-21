import { HttpServerHelper } from "../helpers/HttpServerHelper";
import { IChangeRequestData } from "../models/eft/launcher/IChangeRequestData";
import { ILoginRequestData } from "../models/eft/launcher/ILoginRequestData";
import { IRegisterData } from "../models/eft/launcher/IRegisterData";
import { Info } from "../models/eft/profile/IAkiProfile";
import { ICoreConfig } from "../models/spt/config/ICoreConfig";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { HashUtil } from "../utils/HashUtil";
export declare class LauncherController {
    protected hashUtil: HashUtil;
    protected saveServer: SaveServer;
    protected httpServerHelper: HttpServerHelper;
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected coreConfig: ICoreConfig;
    constructor(hashUtil: HashUtil, saveServer: SaveServer, httpServerHelper: HttpServerHelper, databaseServer: DatabaseServer, configServer: ConfigServer);
    connect(): any;
    find(sessionIdKey: string): Info;
    login(info: ILoginRequestData): string;
    register(info: IRegisterData): string;
    protected createAccount(info: IRegisterData): string;
    changeUsername(info: IChangeRequestData): string;
    changePassword(info: IChangeRequestData): string;
    wipe(info: IRegisterData): string;
    getCompatibleTarkovVersion(): string;
}
