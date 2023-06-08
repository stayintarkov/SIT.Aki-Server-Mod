export interface IQteData {
    Id: string;
    Type: string;
    Area: string;
    AreaLevel: number;
    QuickTimeEvents: IQuickTimeEvent[];
    Requirements: IQteRequirement[];
    Results: Record<string, IQteResult>;
}
export interface IQuickTimeEvent {
    Type: string;
    Position: number;
    StartDelay: number;
    EndDelay: number;
    Speed: number;
    SuccessRange: string;
    Key: string;
}
export interface IQteRequirement {
    type: string;
}
export interface IQteResult {
    Energy: number;
    Hydration: number;
    RewardsRange: IQteEffect[];
}
export interface IQteEffect {
    Type: string;
    SkillId: string;
    levelMultipliers: ISkillLevelMultiplier[];
    Time: number;
    Weight: number;
    Result: string;
}
export interface ISkillLevelMultiplier {
    level: number;
    multiplier: number;
}
