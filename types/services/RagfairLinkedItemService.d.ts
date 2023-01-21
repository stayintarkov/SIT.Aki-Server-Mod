import { DatabaseServer } from "../servers/DatabaseServer";
import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
export declare class RagfairLinkedItemService {
    protected databaseServer: DatabaseServer;
    protected linkedItemsCache: Record<string, Iterable<string>>;
    constructor(databaseServer: DatabaseServer);
    getLinkedItems(linkedSearchId: string): Iterable<string>;
    protected buildLinkedItemTable(): void;
    protected getFilters(item: ITemplateItem, slot: string): string[];
}
