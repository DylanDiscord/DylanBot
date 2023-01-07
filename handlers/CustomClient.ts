import { Client, ClientOptions, Collection } from "discord.js";
import { DatabaseHandler } from "./DatabaseHandler.js";
import { ICommandBase } from "./ICommandBase.js";

export default class CustomClient extends Client {
    commands: Collection<string, ICommandBase> = new Collection<string, ICommandBase>();
    database: DatabaseHandler

    constructor(dbPath: string, options: ClientOptions) {
        super(options);
        this.database = new DatabaseHandler(dbPath);
    }
}