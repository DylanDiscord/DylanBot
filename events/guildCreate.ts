import {Config, CustomDb} from "../exportMain.js";
import { Guild } from "discord.js";
import fs from "node:fs";
import { client } from "../exportMain.js";
import Sqlite3 from "sqlite3";

export default async (guild: Guild) => {
    {
        const dbPath: string = `../${Config.paths.databases}/${guild.id}.db`;
        if (!fs.existsSync(dbPath))
            await client.addDatabase(new CustomDb(dbPath, Sqlite3.OPEN_CREATE | Sqlite3.OPEN_READWRITE), guild);
    }
}