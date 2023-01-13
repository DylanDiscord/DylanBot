import { Config } from "../exportMain.js";
import { Guild } from "discord.js";
import fs from "node:fs";
import { client } from "../exportMain.js";
import Sqlite3 from "sqlite3";
import {CustomMethods} from "../handlers/CustomMethods.js";
import fillDatabase = CustomMethods.fillDatabase;

export default async (guild: Guild) => {
    {
        const dbPath: string = `../${Config.paths.databases}/${guild.id}.db`;
        if (!fs.existsSync(dbPath)) {
            const db: Sqlite3.Database = new Sqlite3.Database(dbPath, Sqlite3.OPEN_CREATE | Sqlite3.OPEN_READWRITE);
            await fillDatabase({database: db});
            client.guild_databases.set(guild.id, db);
        }
    }
}