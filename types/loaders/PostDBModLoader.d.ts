import { DependencyContainer } from "tsyringe";
import { OnLoad } from "../di/OnLoad";
import { PreAkiModLoader } from "./PreAkiModLoader";
export declare class PostDBModLoader implements OnLoad {
    protected preAkiModLoader: PreAkiModLoader;
    constructor(preAkiModLoader: PreAkiModLoader);
    onLoad(): Promise<void>;
    getRoute(): string;
    getModPath(mod: string): string;
    protected executeMods(container: DependencyContainer): void;
}
