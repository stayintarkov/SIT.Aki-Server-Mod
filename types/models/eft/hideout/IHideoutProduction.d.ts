export interface IHideoutProduction {
    _id: string;
    areaType: number;
    requirements: Requirement[];
    productionTime: number;
    boosters?: any;
    endProduct: string;
    continuous: boolean;
    count: number;
    productionLimitCount: number;
}
export interface Requirement {
    templateId?: string;
    count?: number;
    isFunctional?: boolean;
    type: string;
    areaType?: number;
    requiredLevel?: number;
    resource?: number;
}
