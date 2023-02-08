import {CustomClient, PermissionFlags, CustomDb, client, Config} from "../exportMain.js";
import {CommandInteraction, EmbedBuilder, Guild, Role, User} from "discord.js";
import Sqlite3 from "sqlite3";

export default class ModManager {
    private _client: CustomClient;

    public constructor(client: CustomClient) {
        this._client = client;
        void this.fillManager();
    }

    private async fillManager(): Promise<void> {
        for (const db of this._client.guild_databases.entries()) {
            for (const c of await db[1].allAsync("SELECT caseID, reason, userID, moderatorID, caseType, start, end FROM UserCases WHERE caseType = 0 AND end != 0 or null AND end < $current", {current: Date.now() / 1000})) {
                setTimeout(async () => await this.unbanTimeout({c: c, db: db}), Math.round(c.$end! * 1000 - Date.now()));
            }
        }
    }

    public readonly currentCase: Map<string, [CommandInteraction, object | null]> = new Map<string, [CommandInteraction, object | null]>();

    public async addCase(guild: Guild, c: ICase): Promise<number> {
        const db: CustomDb = this._client.guild_databases.get(guild.id)!;
        if (c.caseType == 0 && (c.end != null || c.end! > Math.round(Date.now() / 1000)))
            setTimeout(async () => await this.unbanTimeout({c: c, db: [guild.id, db]}), Math.round(c.end! * 1000 - Date.now()));
        return (await db.allAsync("INSERT INTO UserCases(userID, moderatorID, reason, caseType, start, end) VALUES($userID, $moderatorID, $reason, $caseType, $start, $end) RETURNING caseID", c) as Array<ICase>)[0].caseID!;
    }

    private async unbanTimeout(ref:{c: ICase, db: [string, Sqlite3.Database]}) {
        const banGuild: Guild | undefined = await this._client.guilds.cache.get(ref.db[0]);
        if (banGuild != null)
            await banGuild.bans.remove(ref.c.userID, `Case: ${ref.c.caseID} - time expired.`);
    }

    public async getCases(guild: Guild, filter?: {order?: "asc" | "desc", user: User | null}): Promise<Array<ICase>> {
        return await this._client.guild_databases.get(guild.id)!.allAsync(`SELECT caseID, reason, userID, moderatorID, caseType, start, end FROM UserCases ${filter?.user != null ? "WHERE userID = $user" : ""} ORDER BY caseID ${filter?.order ?? "desc"}`,
            {$user: filter!.user?.id});
    }

    public async isModerator(guild: Guild, user: User): Promise<boolean> {
        return (await this._client.guild_databases.get(guild.id)!.allAsync(`SELECT roleID FROM ServerModerators WHERE roleID = ${(await guild.members.fetch(user)).roles.cache.map(r => `'${r.id}'`).join(" or ")}`)).length > 0 ||
            (await guild.members.fetch(user)).roles.cache.some(r => r.permissions.has(PermissionFlags.Administrator));
    }

    public async addModerator(guild: Guild, role: Role): Promise<boolean> {
        return (await this._client.guild_databases.get(guild.id)!.allAsync("INSERT OR IGNORE INTO ServerModerators(roleID) VALUES($id) RETURNING 1 AS 'r'", {id: role.id})).length > 0;
    }

    public async removeModerator(guild: Guild, role: Role): Promise<boolean> {
        return (await this._client.guild_databases.get(guild.id)!.allAsync("DELETE FROM ServerModerators WHERE roleID = $id RETURNING 1 as 'r'", {id: role.id})).length > 0;
    }

    public async getModerators(guild: Guild): Promise<Array<string>> {
        return (await this._client.guild_databases.get(guild.id)!.allAsync("SELECT roleID FROM ServerModerators")).map(m => m.roleID);
    }

    public async doChecks(interaction: CommandInteraction, objectiveUser: User, botDesc: string): Promise<boolean> {
        if (!interaction.replied && !interaction.deferred) await interaction.deferReply();

        if (!await client.mod_manager.isModerator(interaction.guild!, interaction.user) ||
            (await client.tryGetMember(interaction.guild!, objectiveUser.id)) == null) {
            await interaction.deleteReply();
            return false;
        }

        if (objectiveUser.bot) {
            const botEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle("El usuario es un bot.")
                .setDescription(botDesc)
                .setColor(Config.colors.errorEmbed);

            await interaction.editReply({embeds: [botEmbed]});
            return false;
        }

        return true;
    }

    public async notify(interaction: CommandInteraction, objective: User, reason: string, title: string): Promise<void> {
        try  {
            const notifyEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle(title)
                .setDescription(`**Moderador:** \`${interaction.user.tag}\`\n**Servidor:** \`${interaction.guild!.name}\`\n**Razón:** \`${reason}\``)
                .setColor(Config.colors.defaultEmbed)
                .setTimestamp(Date.now());

            await objective.send({embeds: [notifyEmbed]});
        } catch {}
    }
}

export enum CaseTypes {
    BAN = 0,
    WARN = 1,
    MUTE = 2,
    KICK = 3
}

export namespace CaseTypes {
    export function parse(value: CaseTypes): string | null {
        switch (value) {
            case CaseTypes.BAN: return "BAN";
            case CaseTypes.KICK: return "KICK";
            case CaseTypes.MUTE: return "MUTE";
            case CaseTypes.WARN: return "WARN";
            default: return null;
        }
    }
}

export interface ICase {
    caseID?: number;
    reason: string;
    userID: string;
    moderatorID: string;
    caseType: CaseTypes;
    start: number;
    end?: number;
}