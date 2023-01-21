import { BotWeaponGeneratorHelper } from "../../../helpers/BotWeaponGeneratorHelper";
import { RandomUtil } from "../../../utils/RandomUtil";
import { IInventoryMagGen } from "../IInventoryMagGen";
import { InventoryMagGen } from "../InventoryMagGen";
export declare class BarrelInventoryMagGen implements IInventoryMagGen {
    protected randomUtil: RandomUtil;
    protected botWeaponGeneratorHelper: BotWeaponGeneratorHelper;
    constructor(randomUtil: RandomUtil, botWeaponGeneratorHelper: BotWeaponGeneratorHelper);
    getPriority(): number;
    canHandleInventoryMagGen(inventoryMagGen: InventoryMagGen): boolean;
    process(inventoryMagGen: InventoryMagGen): void;
}
