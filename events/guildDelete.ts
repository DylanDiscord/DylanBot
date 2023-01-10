import { Guild } from "discord.js";
import config from "../config/config.json" assert {type: "json"};
import {client} from "../exportMain.js";
import fs from "node:fs";

export default (guild: Guild) => {
    {
        if (client.guild_databases.has(guild.id)) {
            client.guild_databases.get(guild.id)!.close();
            client.guild_databases.delete(guild.id);
        }

        const dbPath: string = `../${config.paths.databases}/${guild.id}.db`;
        if (fs.existsSync(dbPath)) {
            fs.rmSync(dbPath);
        }
    }
}