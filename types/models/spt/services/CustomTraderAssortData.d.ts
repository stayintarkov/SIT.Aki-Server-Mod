import { ITraderAssort } from "../../eft/common/tables/ITrader";
import { Traders } from "../../enums/Traders";
export interface CustomTraderAssortData {
    traderId: Traders;
    assorts: ITraderAssort;
}
