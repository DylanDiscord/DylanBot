import { Client, ClientOptions, Collection } from "discord.js";
import { CommandBase } from "./CommandBase";
import Sqlite3 from "sqlite3";

export default class CustomClient extends Client {
    commands: Collection<string, CommandBase> = new Collection<string, CommandBase>();
    database: Sqlite3.Database;

    constructor(dbPath: string, options: ClientOptions) {
        super(options);
        this.database = new Sqlite3.Database(dbPath, Sqlite3.OPEN_CREATE | Sqlite3.OPEN_READWRITE);
    }
}