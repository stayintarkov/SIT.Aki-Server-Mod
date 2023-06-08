import { IBaseConfig } from "./IBaseConfig";
export interface ILostOnDeathConfig extends IBaseConfig {
    kind: "aki-lostondeath";
    equipment: Equipment;
    specialSlotItems: boolean;
    questItems: boolean;
}
export interface Equipment {
    ArmBand: boolean;
    Headwear: boolean;
    Earpiece: boolean;
    FaceCover: boolean;
    ArmorVest: boolean;
    Eyewear: boolean;
    TacticalVest: boolean;
    Backpack: boolean;
    Holster: boolean;
    FirstPrimaryWeapon: boolean;
    SecondPrimaryWeapon: boolean;
    Scabbard: boolean;
}
