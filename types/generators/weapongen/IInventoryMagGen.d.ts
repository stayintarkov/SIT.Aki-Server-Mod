import { InventoryMagGen } from "./InventoryMagGen";
export interface IInventoryMagGen {
    getPriority(): number;
    canHandleInventoryMagGen(inventoryMagGen: InventoryMagGen): boolean;
    process(inventoryMagGen: InventoryMagGen): void;
}
