import { Item } from "./tables/IItem";
export interface ILooseLoot {
    spawnpointCount: SpawnpointCount;
    spawnpointsForced: SpawnpointsForced[];
    spawnpoints: Spawnpoint[];
}
export interface SpawnpointCount {
    mean: number;
    std: number;
}
export interface SpawnpointsForced {
    locationId: string;
    probability: number;
    template: SpawnpointTemplate;
}
export interface SpawnpointTemplate {
    Id: string;
    IsStatic: boolean;
    useGravity: boolean;
    randomRotation: boolean;
    Position: Xyz;
    Rotation: Xyz;
    IsGroupPosition: boolean;
    GroupPositions: any[];
    Root: any;
    Items: Item[];
}
export interface Spawnpoint {
    locationId: string;
    probability: number;
    template: SpawnpointTemplate;
    itemDistribution: ItemDistribution[];
}
export interface Xyz {
    x: number;
    y: number;
    z: number;
}
export interface ItemDistribution {
    composedKey: ComposedKey;
    relativeProbability: number;
}
export interface ComposedKey {
    key: string;
}
