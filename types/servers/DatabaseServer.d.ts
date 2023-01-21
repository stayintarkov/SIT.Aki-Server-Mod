import { IDatabaseTables } from "../models/spt/server/IDatabaseTables";
export declare class DatabaseServer {
    protected tableData: IDatabaseTables;
    getTables(): IDatabaseTables;
    setTables(tableData: IDatabaseTables): void;
}
