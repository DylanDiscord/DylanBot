import { Client, ClientOptions, Collection } from "discord.js";
import { CommandBase } from "./CommandBase.js";
import Sqlite3 from "sqlite3";
import fs from "node:fs";
import {CustomMethods} from "./CustomMethods.js";
import fillDatabase = CustomMethods.fillDatabase;

export default class CustomClient extends Client {
    commands: Collection<string, CommandBase> = new Collection<string, CommandBase>();
    global_database: Sqlite3.Database;
    guild_databases: Map<string, Sqlite3.Database> = new Map();

    constructor(dbPath: string, options: ClientOptions) {
        super(options);
        dbPath = dbPath.replace(/\//gm, "\\");
        if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, {recursive: true});
        this.global_database = new Sqlite3.Database(`${dbPath}\\global.db`, Sqlite3.OPEN_CREATE | Sqlite3.OPEN_READWRITE);
        setTimeout(async () => {await this.registerDb(dbPath); console.log("Databases registered correctly.");}, 5000);
    }

    private async registerDb(dbPath: string): Promise<void> {
        this.guilds.cache.forEach((async g => {
            const db: Sqlite3.Database = new Sqlite3.Database(`${dbPath}\\${g.id}.db`, Sqlite3.OPEN_CREATE | Sqlite3.OPEN_READWRITE);
            await fillDatabase({database: db});
            this.guild_databases.set(g.id, db);
        }));
    }
}