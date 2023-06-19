import { BundleLoader } from "@spt-aki/loaders/BundleLoader";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";
import { DependencyContainer } from "tsyringe";
import { ExternalIPFinder } from "./ExternalIPFinder";

class BundleInfo
{
    modPath: string;
    key: string;
    path: string;
    filepath: string;
    dependencyKeys: string[];

    constructor(modpath: string, bundle: any, bundlePath: string, bundleFilepath: string)
    {
        this.modPath = modpath;
        this.key = bundle.key;
        this.path = bundlePath;
        this.filepath = bundleFilepath;
        this.dependencyKeys = bundle.dependencyKeys || [];
    }
}

export class BundleLoaderFixed
{
    protected bundles: Record<string, BundleInfo> = {};
    jsonUtil: JsonUtil;
    vfs: VFS;
    externalIPFinder: ExternalIPFinder;

    constructor(
        vfs: VFS,
        jsonUtil: JsonUtil,
        externalIPFinder: ExternalIPFinder
    )
    { 

        this.vfs = vfs;
        this.jsonUtil = jsonUtil;
        this.externalIPFinder = externalIPFinder
    }

    public getBundles(local: boolean): BundleInfo[]
    {
        const result: BundleInfo[] = [];

        for (const bundle in this.bundles)
        {
            result.push(this.getBundle(bundle, local));
        }

        return result;
    }

    public getBundle(key: string, local: boolean): BundleInfo
    {
        const bundle = this.jsonUtil.clone(this.bundles[key]);

        if (local)
        {
            bundle.path = bundle.filepath;
        }

        delete bundle.filepath;
        return bundle;
    }

    public addBundles(modpath: string): void
    {
        const manifest = this.jsonUtil.deserialize<BundleManifest>(this.vfs.readFile(`${modpath}bundles.json`)).manifest;

        for (const bundle of manifest)
        {
            const bundlePath = `${this.externalIPFinder.resolveExternalIP()}/files/bundle/${bundle.key}`;
            const bundleFilepath = bundle.path || `${modpath}bundles/${bundle.key}`.replace(/\\/g, "/");
            this.addBundle(bundle.key, new BundleInfo(modpath, bundle, bundlePath, bundleFilepath));
        }
    }

    public addBundle(key: string, b: BundleInfo): void {
        this.bundles[key] = b;
    }

    public resolveAndOverride(container: DependencyContainer): void {


        const thisObj = this;

        container.afterResolution("BundleLoader", (_t, result: BundleLoader) => {
            result.addBundle = (key: string, b: BundleInfo) => {
                return thisObj.addBundle(key, b);
            }
            result.addBundles = (modpath: string) => {
                return thisObj.addBundles(modpath);
            }
            result.getBundle = (key: string, local: boolean) => {
                return thisObj.getBundle(key, local);
            }
            result.getBundles = (local: boolean) => {
                return thisObj.getBundles(local);
            }
        });
    }
}

export interface BundleManifest
{
    manifest: Array<BundleManifestEntry>
}

export interface BundleManifestEntry
{
    key: string
    path: string
}