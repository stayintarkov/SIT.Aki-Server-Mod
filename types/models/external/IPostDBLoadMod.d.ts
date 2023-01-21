import { DependencyContainer } from "./tsyringe";
export interface IPostDBLoadMod {
    postDBLoad(container: DependencyContainer): void;
}
