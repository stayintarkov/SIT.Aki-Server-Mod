import { ILocationBase } from "./ILocationBase";
import { ILooseLoot } from "./ILooseLoot";
export interface ILocation {
    base: ILocationBase;
    looseLoot: ILooseLoot;
    statics: IStaticContainer;
}
export interface IStaticContainer {
    containersGroups: Record<string, IContainerMinMax>;
    containers: Record<string, IContainerData>;
}
export interface IContainerMinMax {
    minContainers: number;
    maxContainers: number;
    current?: number;
    chosenCount?: number;
}
export interface IContainerData {
    groupId: string;
}
