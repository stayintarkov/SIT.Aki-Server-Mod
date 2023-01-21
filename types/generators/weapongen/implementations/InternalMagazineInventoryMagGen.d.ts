import { BotWeaponGeneratorHelper } from "../../../helpers/BotWeaponGeneratorHelper";
import { IInventoryMagGen } from "../IInventoryMagGen";
import { InventoryMagGen } from "../InventoryMagGen";
export declare class InternalMagazineInventoryMagGen implements IInventoryMagGen {
    protected botWeaponGeneratorHelper: BotWeaponGeneratorHelper;
    constructor(botWeaponGeneratorHelper: BotWeaponGeneratorHelper);
    getPriority(): number;
    canHandleInventoryMagGen(inventoryMagGen: InventoryMagGen): boolean;
    process(inventoryMagGen: InventoryMagGen): void;
}
