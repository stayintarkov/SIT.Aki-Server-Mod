import { DependencyContainer } from "tsyringe";
import { OnLoad } from "../di/OnLoad";
import { ILogger } from "../models/spt/utils/ILogger";
import { LocalisationService } from "../services/LocalisationService";
import { ModTypeCheck } from "./ModTypeCheck";
import { PreAkiModLoader } from "./PreAkiModLoader";
export declare class PostDBModLoader implements OnLoad {
    protected logger: ILogger;
    protected preAkiModLoader: PreAkiModLoader;
    protected localisationService: LocalisationService;
    protected modTypeCheck: ModTypeCheck;
    constructor(logger: ILogger, preAkiModLoader: PreAkiModLoader, localisationService: LocalisationService, modTypeCheck: ModTypeCheck);
    onLoad(): Promise<void>;
    getRoute(): string;
    getModPath(mod: string): string;
    protected executeMods(container: DependencyContainer): Promise<void>;
}
