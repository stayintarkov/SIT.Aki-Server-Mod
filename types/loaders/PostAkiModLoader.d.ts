import { DependencyContainer } from "tsyringe";
import { IModLoader } from "../models/spt/mod/IModLoader";
import { ILogger } from "../models/spt/utils/ILogger";
import { LocalisationService } from "../services/LocalisationService";
import { VFS } from "../utils/VFS";
import { BundleLoader } from "./BundleLoader";
import { ModTypeCheck } from "./ModTypeCheck";
import { PreAkiModLoader } from "./PreAkiModLoader";
export declare class PostAkiModLoader implements IModLoader {
    protected logger: ILogger;
    protected bundleLoader: BundleLoader;
    protected vfs: VFS;
    protected preAkiModLoader: PreAkiModLoader;
    protected localisationService: LocalisationService;
    protected modTypeCheck: ModTypeCheck;
    constructor(logger: ILogger, bundleLoader: BundleLoader, vfs: VFS, preAkiModLoader: PreAkiModLoader, localisationService: LocalisationService, modTypeCheck: ModTypeCheck);
    getModPath(mod: string): string;
    load(): Promise<void>;
    protected executeMods(container: DependencyContainer): Promise<void>;
    protected addBundles(): void;
}
