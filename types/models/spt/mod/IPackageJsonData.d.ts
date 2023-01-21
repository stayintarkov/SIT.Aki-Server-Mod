export interface IPackageJsonData {
    incompatibilities?: string[];
    dependencies?: string[];
    modDependencies?: Record<string, string>;
    name: string;
    author: string;
    version: string;
    akiVersion: string;
    licence: string;
    main: string;
    contributors: string[];
}
