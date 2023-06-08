import { ItemHelper } from "../helpers/ItemHelper";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { DatabaseServer } from "../servers/DatabaseServer";
export declare class RagfairLinkedItemService {
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected linkedItemsCache: Record<string, Iterable<string>>;
    constructor(databaseServer: DatabaseServer, itemHelper: ItemHelper);
    getLinkedItems(linkedSearchId: string): Iterable<string>;
    /**
     * Create Dictionary of every item and the items associated with it
     */
    protected buildLinkedItemTable(): void;
    /**
     * Add ammo to revolvers linked item dictionary
     * @param cylinder Revolvers cylinder
     * @param applyLinkedItems
     */
    protected addRevolverCylinderAmmoToLinkedItems(cylinder: ITemplateItem, applyLinkedItems: (items: string[]) => void): void;
    protected getFilters(item: ITemplateItem, slot: string): string[];
}
