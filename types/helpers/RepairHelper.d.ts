import { Item } from "../models/eft/common/tables/IItem";
import { ITemplateItem, Props } from "../models/eft/common/tables/ITemplateItem";
import { IRepairConfig } from "../models/spt/config/IRepairConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { JsonUtil } from "../utils/JsonUtil";
import { RandomUtil } from "../utils/RandomUtil";
export declare class RepairHelper {
    protected logger: ILogger;
    protected jsonUtil: JsonUtil;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected repairConfig: IRepairConfig;
    constructor(logger: ILogger, jsonUtil: JsonUtil, randomUtil: RandomUtil, databaseServer: DatabaseServer, configServer: ConfigServer);
    /**
     * Alter an items durability after a repair by trader/repair kit
     * @param itemToRepair item to update durability details
     * @param itemToRepairDetails db details of item to repair
     * @param isArmor Is item being repaired a piece of armor
     * @param amountToRepair how many unit of durability to repair
     * @param useRepairKit Is item being repaired with a repair kit
     * @param applyMaxDurabilityDegradation should item have max durability reduced
     */
    updateItemDurability(itemToRepair: Item, itemToRepairDetails: ITemplateItem, isArmor: boolean, amountToRepair: number, useRepairKit: boolean, traderQualityMultipler: number, applyMaxDurabilityDegradation?: boolean): void;
    protected getRandomisedArmorRepairDegradationValue(armorMaterial: string, isRepairKit: boolean, armorMax: number, traderQualityMultipler: number): number;
    protected getRandomisedWeaponRepairDegradationValue(itemProps: Props, isRepairKit: boolean, weaponMax: number, traderQualityMultipler: number): number;
    /**
     * Is the supplied tpl a weapon
     * @param tpl tplId to check is a weapon
     * @returns true if tpl is a weapon
     */
    isWeaponTemplate(tpl: string): boolean;
}
