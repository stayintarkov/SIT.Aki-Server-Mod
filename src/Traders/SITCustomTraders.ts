import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { DependencyContainer } from "tsyringe";

export class SITCustomTraders implements IPreAkiLoadMod, IPostDBLoadMod
{
    postDBLoad(container: DependencyContainer): void {
        throw new Error("Method not implemented.");
    }
    preAkiLoad(container: DependencyContainer): void {
        throw new Error("Method not implemented.");
    }
}