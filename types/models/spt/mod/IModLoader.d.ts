import { DependencyContainer } from "tsyringe";
export interface IModLoader {
    load(container: DependencyContainer): void;
    getBundles(local: boolean): string;
    getBundle(key: string, local: boolean): void;
    getModPath(mod: string): string;
}
