import { OnLoad } from "../di/OnLoad";
import { PostAkiModLoader } from "../loaders/PostAkiModLoader";
import { IHttpConfig } from "../models/spt/config/IHttpConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { LocalisationService } from "../services/LocalisationService";
import { HttpFileUtil } from "../utils/HttpFileUtil";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
declare class ModCallbacks implements OnLoad {
    protected logger: ILogger;
    protected httpResponse: HttpResponseUtil;
    protected httpFileUtil: HttpFileUtil;
    protected postAkiModLoader: PostAkiModLoader;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected httpConfig: IHttpConfig;
    constructor(logger: ILogger, httpResponse: HttpResponseUtil, httpFileUtil: HttpFileUtil, postAkiModLoader: PostAkiModLoader, localisationService: LocalisationService, configServer: ConfigServer);
    onLoad(): Promise<void>;
    getRoute(): string;
}
export { ModCallbacks };
