export interface IHideoutArea {
    _id: string;
    type: number;
    enabled: boolean;
    needsFuel: boolean;
    takeFromSlotLocked: boolean;
    craftGivesExp: boolean;
    stages: Record<string, Stage>;
}
export interface Stage {
    requirements: Requirement[];
    bonuses: StageBonus[];
    slots: number;
    constructionTime: number;
    description: string;
}
export interface Requirement {
    areaType?: number;
    requiredLevel?: number;
    type: string;
    templateId?: string;
    count?: number;
    isFunctional?: boolean;
    traderId?: string;
    loyaltyLevel?: number;
    skillName?: string;
    skillLevel?: number;
}
export interface StageBonus {
    value: number;
    passive: boolean;
    production: boolean;
    visible: boolean;
    skillType?: string;
    type: string;
    filter?: string[];
    icon?: string;
    id?: string;
    templateId?: string;
}
