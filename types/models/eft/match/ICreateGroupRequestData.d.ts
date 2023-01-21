import { RaidMode } from "../../enums/RaidMode";
export interface ICreateGroupRequestData {
    location: string;
    raidMode: RaidMode;
    startInGroup: boolean;
}
