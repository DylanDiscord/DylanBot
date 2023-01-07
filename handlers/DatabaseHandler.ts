import Sqlite3 from "sqlite3";
import fs from "node:fs";
import { CustomMethods } from "./CustomMethods.js";

export class DatabaseHandler {
    readonly #dataFile: Sqlite3.Database;
    public tables: Map<string, Table> = new Map();

    public constructor(path: string) {
        const pathWithoutFile: string = path.substring(0, path.lastIndexOf("/") != -1 ? path.lastIndexOf("/") : path.lastIndexOf("\\"));
        if (!fs.existsSync(pathWithoutFile)) fs.mkdirSync(pathWithoutFile, {recursive: true});
        this.#dataFile = new Sqlite3.Database(path, Sqlite3.OPEN_READWRITE | Sqlite3.OPEN_CREATE);
        void this.mapData();
    }

    private async mapData(): Promise<void> {
        this.tables.clear();
        const tableNames: Array<any> | null = await CustomMethods.returnPromiseResult((resolve, reject): void => {
            this.#dataFile.all("SELECT name FROM sqlite_master WHERE type = 'table'", (error: Error | null, data: any[]): void => {
                if (error != null) reject(error);
                else resolve(Array.isArray(data) ? data : [data]);
            });
        });
        if (tableNames == null) return;
        for (const tableName of tableNames) {
            const tableData: Array<any> = await CustomMethods.returnPromiseResult((resolve, reject): void => {
               this.#dataFile.all(`SELECT * FROM pragma_table_info('${tableName}')`, (error: Error | null, data: any[]): void => {
                   if (error != null) reject(error);
                   else resolve(Array.isArray(data) ? data : [data]);
               });
            });
            //add unique if necessary
            //this.tables.set(tableName.name, new Table(tableName.name, tableData.map(t => ({name: t.name, type: TableTypes.parse(t.type), notNull: t.notnull == 1, primaryKey: t.primaryKey == 1, unique: false})), this.#dataFile));
        }
    }

    public async createTable(name: string, ifNExists: boolean, ...columns: IColumn[]): Promise<Table> {
        const tables: string = columns.map(i => `${i.name} ${i.type} ${i.notNull ? "NOT NULL" : ""} ${i.primaryKey ? "PRIMARY KEY" : ""}`).join(", ");
        const uniques: string | null = columns.some(i => i.unique) ? `UNIQUE(${columns.map((i, index) => `${i.unique ? i.name : ""}${columns.length - 1 != index ? ',' : ""}`)})` : null;
        const requestString: string = `CREATE TABLE ${ifNExists ? "IF NOT EXISTS" : ""} ${name}(${tables}${uniques != null ? `,${uniques}` : ""})`;
        return CustomMethods.returnPromiseResult((resolve, reject): void => {
            this.#dataFile.run(requestString, (error: Error | null): void => {
                if (error != null) reject(error);
                else {
                    const table: Table = new Table(name, columns, this.#dataFile);
                    this.tables.set(name, table);
                    resolve(table);
                }
            });
        });
    }

    public async dropTable(name: string, ifExists: boolean): Promise<boolean> {
        const requestString: string = `DROP TABLE ${ifExists ? "IF EXISTS" : ""} ${name}`;
        return CustomMethods.returnPromiseResult((resolve, reject): void => {
            this.#dataFile.run(requestString, (error: Error | null): void => {
                if (error) reject(error);
                else {
                    if (this.tables.has(name)) this.tables.delete(name);
                    resolve(true);
                }
            });
        });
    }

    public async runCommand(command: string, params: object): Promise<any> {
        const result: any = await CustomMethods.returnPromiseResult((resolve, reject): void => {
            this.#dataFile.all(command, params, (error: Error | null, result: any[]) => {
                if (error != null) reject(error);
                else resolve(result);
            });
        });
        void this.mapData();
        return result;
    }
}

export class Table {
    public name: string;
    #dataFile: Sqlite3.Database;
    public columns: IColumn[]

    public constructor(name: string, columns: IColumn[], dataFile: Sqlite3.Database) {
        this.name = name;
        this.#dataFile = dataFile;
        this.columns = columns;
    }

    public async insert(orIgnore: boolean, ...data: any[]): Promise<boolean> {

        const requestString: string = `INSERT ${orIgnore ? "OR IGNORE" : ""} INTO ${this.name}(${this.columns.map((c, i) => `${c.name}${this.columns.length - 1 != i ? ',' : ""}`)}) VALUES()`;
        return CustomMethods.returnPromiseResult((resolve, reject): void => {
            this.#dataFile.run(requestString, (error: Error | null): void => {
                if (error != null) reject(error);
                else resolve(true);
            });
        });
    }
}

export interface IColumn {
    name: string;
    type: TableTypes
    unique?: boolean
    primaryKey?: boolean
    notNull?: boolean
}

export enum TableTypes {
    TString = "TEXT",
    TInt = "INT",
    TReal = "REAL",
    TBlob = "BLOB",
}

export namespace TableTypes {
    export function parse(name: string): TableTypes | null {
        switch (name) {
            case "TEXT":
                return TableTypes.TString;
            case "INT":
                return TableTypes.TInt;
            case "REAL":
                return TableTypes.TReal;
            case "BLOB":
                return TableTypes.TBlob;
            default:
                return null;
        }
    }
}