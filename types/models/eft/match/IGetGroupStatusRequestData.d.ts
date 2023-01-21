import { RaidMode } from "../../enums/RaidMode";
export interface IGetGroupStatusRequestData {
    location: string;
    savage: boolean;
    dt: string;
    keyId: string;
    raidMode: RaidMode;
    startInGroup: boolean;
}
