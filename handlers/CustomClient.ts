import {Client, ClientOptions, Collection, Guild, GuildMember, Role, User} from "discord.js";
import express, {Express} from "express";
import {ModManager, CommandBase, CustomDb} from "../exportMain.js";
import Sqlite3 from "sqlite3";
import fs from "node:fs";

export default class CustomClient extends Client {
    public commands: Collection<string, CommandBase> = new Collection<string, CommandBase>();
    public global_database: CustomDb;
    public guild_databases: Map<string, CustomDb> = new Map();
    public mod_manager: ModManager;
    public api: Express = express();

    private readonly _db_path: string;

    public constructor(dbPath: string, port: number, options: ClientOptions) {
        super(options);
        this._db_path = dbPath.replace(/\//gm, "\\");
        if (!fs.existsSync(this._db_path)) fs.mkdirSync(this._db_path, {recursive: true});
        this.global_database = new CustomDb(`${this._db_path}\\global.db`, Sqlite3.OPEN_CREATE | Sqlite3.OPEN_READWRITE);
        setTimeout(async () => await this.registerDb(),5000);
        this.mod_manager = new ModManager(this);
        this.api.listen(port);
    }

    private async registerDb(): Promise<void> {
        await this.global_database.runAsync("CREATE TABLE IF NOT EXISTS PremiumServers(serverID INTEGER PRIMARY KEY, unique(serverID))");
        this.guilds.cache.forEach((async g => {
            await this.addDatabase(new CustomDb(`${this._db_path}\\${g.id}.db`, Sqlite3.OPEN_CREATE | Sqlite3.OPEN_READWRITE), g);
        }));
        await console.log("Databases registered correctly.");
    }

    public async addDatabase(db: CustomDb, g: Guild): Promise<void> {
        await db.allAsync("CREATE TABLE IF NOT EXISTS UserLevels(userID TEXT, experience INTEGER, level INTEGER, unique(userID));");
        await db.allAsync("CREATE TABLE IF NOT EXISTS UserCases(caseID INTEGER PRIMARY KEY AUTOINCREMENT, userID TEXT, moderatorID TEXT, reason TEXT, caseType INTEGER, start INTEGER, end INTEGER, unique(caseID))");
        await db.allAsync("CREATE TABLE IF NOT EXISTS ServerModerators(roleID INTEGER PRIMARY KEY, unique(roleID));");
        this.guild_databases.set(g.id, db);
    }

    public async tryGetGuild(snowflake: string): Promise<Guild | null> {
        try {
            return (await this.guilds.fetch(snowflake));
        } catch {
            return null;
        }
    }

    public async tryGetUser(snowflake: string): Promise<User | null> {
        try {
            return (await this.users.fetch(snowflake));
        } catch {
            return null;
        }
    }

    public async tryGetRole(guild: Guild, snowflake: string): Promise<Role | null> {
        try {
            return (await guild.roles.fetch(snowflake));
        } catch {
            return null;
        }
    }

    public async tryGetMember(guild: Guild, snowflake: string): Promise<GuildMember | null> {
        try {
            return (await guild.members.fetch(snowflake));
        } catch {
            return null;
        }
    }
}