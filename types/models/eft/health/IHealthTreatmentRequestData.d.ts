export interface IHealthTreatmentRequestData {
    Action: "RestoreHealth";
    trader: string;
    items: Item[];
    difference: Difference;
    timestamp: number;
}
export interface Item {
    id: string;
    count: number;
}
export interface Difference {
    BodyParts: BodyParts;
    Energy: number;
    Hydration: number;
}
export interface BodyParts {
    Head: BodyPart;
    Chest: BodyPart;
    Stomach: BodyPart;
    LeftArm: BodyPart;
    RightArm: BodyPart;
    LeftLeg: BodyPart;
    RightLeg: BodyPart;
}
export interface BodyPart {
    Health: number;
    Effects: string[];
}
