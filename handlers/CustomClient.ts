import { Client, ClientOptions, Collection } from "discord.js";
import { DatabaseHandler } from "./DatabaseHandler.js";
import { CommandBase } from "./CommandBase";

export default class CustomClient extends Client {
    commands: Collection<string, CommandBase> = new Collection<string, CommandBase>();
    database: DatabaseHandler

    constructor(dbPath: string, options: ClientOptions) {
        super(options);
        this.database = new DatabaseHandler(dbPath);
    }
}