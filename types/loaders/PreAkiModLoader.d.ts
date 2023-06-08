import { DependencyContainer } from "tsyringe";
import { ICoreConfig } from "../models/spt/config/ICoreConfig";
import { IModLoader } from "../models/spt/mod/IModLoader";
import { IPackageJsonData } from "../models/spt/mod/IPackageJsonData";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { LocalisationService } from "../services/LocalisationService";
import { ModCompilerService } from "../services/ModCompilerService";
import { JsonUtil } from "../utils/JsonUtil";
import { VFS } from "../utils/VFS";
import { BundleLoader } from "./BundleLoader";
import { ModTypeCheck } from "./ModTypeCheck";
export declare class PreAkiModLoader implements IModLoader {
    protected logger: ILogger;
    protected vfs: VFS;
    protected jsonUtil: JsonUtil;
    protected modCompilerService: ModCompilerService;
    protected bundleLoader: BundleLoader;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected modTypeCheck: ModTypeCheck;
    protected static container: DependencyContainer;
    protected readonly basepath = "user/mods/";
    protected readonly modOrderPath = "user/mods/order.json";
    protected order: Record<string, number>;
    protected imported: Record<string, IPackageJsonData>;
    protected akiConfig: ICoreConfig;
    constructor(logger: ILogger, vfs: VFS, jsonUtil: JsonUtil, modCompilerService: ModCompilerService, bundleLoader: BundleLoader, localisationService: LocalisationService, configServer: ConfigServer, modTypeCheck: ModTypeCheck);
    load(container: DependencyContainer): Promise<void>;
    /**
     * Returns a list of mods with preserved load order
     * @returns Array of mod names in load order
     */
    getImportedModsNames(): string[];
    getImportedModDetails(): Record<string, IPackageJsonData>;
    getModPath(mod: string): string;
    protected importMods(): Promise<void>;
    /**
     * Check for duplciate mods loaded, show error if duplicate mod found
     * @param modPackageData dictionary of mod package.json data
     */
    protected checkForDuplicateMods(modPackageData: Record<string, IPackageJsonData>): void;
    /**
     * Check for and return duplicate strings inside an array
     * @param stringArray Array to check for duplicates
     * @returns string array of duplicates, empty if none found
     */
    protected getDuplicates(stringArray: string[]): string[];
    /**
     * Get an array of mods with errors that prevent them from working with SPT
     * @param mods mods to validate
     * @returns Mod names as array
     */
    protected getBrokenMods(mods: string[]): string[];
    /**
     * Get packageJson data for mods
     * @param mods mods to get packageJson for
     * @returns dictionary <modName - package.json>
     */
    protected getModsPackageData(mods: string[]): Record<string, IPackageJsonData>;
    protected isModCombatibleWithAki(mod: IPackageJsonData): boolean;
    protected executeMods(container: DependencyContainer): Promise<void>;
    sortModsLoadOrder(): string[];
    protected addMod(mod: string): Promise<void>;
    protected areModDependenciesFulfilled(pkg: IPackageJsonData, loadedMods: Record<string, IPackageJsonData>): boolean;
    protected isModCompatible(mod: IPackageJsonData, loadedMods: Record<string, IPackageJsonData>): boolean;
    /**
     * Validate a mod passes a number of checks
     * @param modName name of mod in /mods/ to validate
     * @returns true if valid
     */
    protected validMod(modName: string): boolean;
    protected getLoadOrderRecursive(mod: string, result: Record<string, string>, visited: Record<string, string>): void;
    protected getLoadOrder(mods: Record<string, IPackageJsonData>): Record<string, string>;
    getContainer(): DependencyContainer;
}
