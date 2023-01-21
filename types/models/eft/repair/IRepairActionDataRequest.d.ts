import { IBaseRepairActionDataRequest } from "./IBaseRepairActionDataRequest";
export interface IRepairActionDataRequest extends IBaseRepairActionDataRequest {
    Action: "Repair";
    repairKitsInfo: RepairKitsInfo[];
    target: string;
}
export interface RepairKitsInfo {
    _id: string;
    count: number;
}
