import { Dialogue, WeaponBuild } from "../../profile/IAkiProfile";
import { IPmcData } from "../IPmcData";
export interface IProfileTemplates {
    Standard: IProfileSides;
    "Left Behind": IProfileSides;
    "Prepare To Escape": IProfileSides;
    "Edge Of Darkness": IProfileSides;
}
export interface IProfileSides {
    usec: TemplateSide;
    bear: TemplateSide;
}
export interface TemplateSide {
    character: IPmcData;
    suits: string[];
    dialogues: Record<string, Dialogue>;
    weaponbuilds: WeaponBuild[];
    trader: ProfileTraderTemplate;
}
export interface ProfileTraderTemplate {
    initialLoyaltyLevel: number;
    setQuestsAvailableForStart?: boolean;
    setQuestsAvailableForFinish?: boolean;
    initialStanding: number;
    initialSalesSum: number;
    jaegerUnlocked: boolean;
}
