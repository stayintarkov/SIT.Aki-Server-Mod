import path from "node:path";
import { BundleHashCacheService } from "@spt-aki/services/cache/BundleHashCacheService";
import { BundleInfo, BundleLoader } from "@spt-aki/loaders/BundleLoader";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";
import { DependencyContainer } from "tsyringe";

export class BundleLoaderOverride
{
    container: DependencyContainer;
    jsonUtil: JsonUtil;
    vfs: VFS;
    protected bundles: Record<string, BundleInfo> = {};
    bundleHashCacheService: BundleHashCacheService;

    constructor(
        container: DependencyContainer
    )
    { 
        this.bundleHashCacheService = container.resolve<BundleHashCacheService>("BundleHashCacheService");
        this.container = container;
        this.vfs = container.resolve<VFS>("VFS");
        this.jsonUtil = container.resolve<JsonUtil>("JsonUtil");
    }

    public getBundles(): BundleInfo[]
    {
        const result: BundleInfo[] = [];

        for (const bundle in this.bundles)
        {
            result.push(this.getBundle(bundle));
        }
        
        return result;
    }

    public getBundle(key: string): BundleInfo
    {
        //decode the bundle key name to support spaces, etc.
        return this.jsonUtil.clone(this.bundles[key]);
    }

    public addBundles(modpath: string): void
    {
        const bundleManifestArr = this.jsonUtil.deserialize<BundleManifest>(this.vfs.readFile(`${modpath}bundles.json`)).manifest;

        for (const bundleManifest of bundleManifestArr)
        {          
            // return a partial url. the complete url will be build on client side.
            const absoluteModPath = path.join(process.cwd(), modpath).slice(0, -1).replace(/\\/g, "/");
            const bundleLocalPath = `${modpath}bundles/${bundleManifest.key}`.replace(/\\/g, "/");

            if (!this.bundleHashCacheService.calculateAndMatchHash(bundleLocalPath))
            {
                this.bundleHashCacheService.calculateAndStoreHash(bundleLocalPath);
            }

            const bundleHash = this.bundleHashCacheService.getStoredValue(bundleLocalPath);

            this.addBundle(bundleManifest.key, new BundleInfo(absoluteModPath, bundleManifest, bundleHash));
        }
    }

    public addBundle(key: string, b: BundleInfo): void {
        this.bundles[key] = b;
    }

    public override(): void {

        const thisObj = this;

        this.container.afterResolution("BundleLoader", (_t, result: BundleLoader) => {
            result.addBundle = (key: string, b: BundleInfo) => {
                return thisObj.addBundle(key, b);
            }
            result.addBundles = (modpath: string) => {
                return thisObj.addBundles(modpath);
            }
            result.getBundle = (key: string) => {
                return thisObj.getBundle(key);
            }
            result.getBundles = () => {
                
                return thisObj.getBundles();
            }
        });
    }
}

export interface BundleManifest
{
    manifest: BundleManifestEntry[];
}

export interface BundleManifestEntry
{
    key: string;
    dependencyKeys: string[];
}