import { DependencyContainer } from "./tsyringe";
export interface IPreAkiLoadMod {
    preAkiLoad(container: DependencyContainer): void;
}
