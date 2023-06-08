import { DependencyContainer } from "./tsyringe";
export interface IPreAkiLoadModAsync {
    preAkiLoadAsync(container: DependencyContainer): Promise<void>;
}
