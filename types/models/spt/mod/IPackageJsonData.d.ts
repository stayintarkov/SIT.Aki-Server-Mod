export interface IPackageJsonData {
    incompatibilities?: string[];
    dependencies?: Record<string, string>;
    modDependencies?: Record<string, string>;
    name: string;
    author: string;
    version: string;
    akiVersion: string;
    licence: string;
    main: string;
    isBundleMod: boolean;
    contributors: string[];
}
