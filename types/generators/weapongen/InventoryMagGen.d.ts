import { MinMax } from "../../models/common/MinMax";
import { Inventory } from "../../models/eft/common/tables/IBotBase";
import { ITemplateItem } from "../../models/eft/common/tables/ITemplateItem";
export declare class InventoryMagGen {
    private magCounts;
    private magazineTemplate;
    private weaponTemplate;
    private ammoTemplate;
    private pmcInventory;
    constructor(magCounts: MinMax, magazineTemplate: ITemplateItem, weaponTemplate: ITemplateItem, ammoTemplate: ITemplateItem, pmcInventory: Inventory);
    getMagCount(): MinMax;
    getMagazineTemplate(): ITemplateItem;
    getWeaponTemplate(): ITemplateItem;
    getAmmoTemplate(): ITemplateItem;
    getPmcInventory(): Inventory;
}
