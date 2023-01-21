import { HandbookHelper } from "../helpers/HandbookHelper";
import { DatabaseServer } from "../servers/DatabaseServer";
export declare class HandbookController {
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    constructor(databaseServer: DatabaseServer, handbookHelper: HandbookHelper);
    load(): void;
}
