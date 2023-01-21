import { ILoginRequestData } from "./ILoginRequestData";
export interface IChangeRequestData extends ILoginRequestData {
    change: string;
}
