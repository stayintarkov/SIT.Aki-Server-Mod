import { Item } from "./IItem";
export interface ILootBase {
    staticAmmo: Record<string, IStaticAmmoDetails[]>;
    staticContainers: Record<string, IStaticContainerDetails>;
    staticLoot: Record<string, IStaticLootDetails>;
}
export interface IStaticAmmoDetails {
    tpl: string;
    relativeProbability: number;
}
export interface IStaticContainerDetails {
    staticWeapons: IStaticWeaponProps[];
    staticContainers: IStaticContainerProps[];
    staticForced: IStaticForcedProps[];
}
export interface IStaticWeaponProps {
    Id: string;
    IsStatic: boolean;
    useGravity: boolean;
    randomRotation: boolean;
    Position: Xyz;
    Rotation: Xyz;
    IsGroupPosition: boolean;
    GroupPositions: any[];
    Root: string;
    Items: Item[];
}
export interface IStaticContainerProps {
    Id: string;
    IsStatic: boolean;
    useGravity: boolean;
    randomRotation: boolean;
    Position: Xyz;
    Rotation: Xyz;
    IsGroupPosition: boolean;
    GroupPositions: any[];
    Root: any;
    Items: StaticItem[];
}
export interface Xyz {
    x: number;
    y: number;
    z: number;
}
export interface StaticItem {
    _id: any;
    _tpl: string;
}
export interface IStaticForcedProps {
    containerId: string;
    itemTpl: string;
}
export interface IStaticLootDetails {
    itemcountDistribution: ItemCountDistribution[];
    itemDistribution: ItemDistribution[];
}
export interface ItemCountDistribution {
    count: number;
    relativeProbability: number;
}
export interface ItemDistribution {
    tpl: string;
    relativeProbability: number;
}
