import {CustomClient, CustomMethods, PermissionFlags} from "../exportMain.js";
import {Guild, Role, User} from "discord.js";
import Sqlite3 from "sqlite3";

export default class ModManager {
    private _client: CustomClient;

    public constructor(client: CustomClient) {
        this._client = client;
        void this.fillManager();
    }

    private async fillManager(): Promise<void> {
        for (const db of this._client.guild_databases.entries()) {
            for (const c of await CustomMethods.getDataFromDb<ICase>({
                db: db[1],
                command: "SELECT caseID, reason, userID, moderatorID, caseType, start, end FROM UserCases WHERE caseType = 0 AND end != 0 or null AND end < $current",
                params: {$current: Date.now() / 1000}})) {
                setTimeout(async () => await this.unbanTimeout({c: c, db: db}), Math.round(c.$end! * 1000 - Date.now()));
            }
        }
    }

    public async addCase(guild: Guild, c: ICase): Promise<number> {
        const db: Sqlite3.Database = this._client.guild_databases.get(guild.id)!;
        if (c.$caseType == 0 && (c.$end != null || c.$end! > Math.round(Date.now() / 1000)))
            setTimeout(async () => await this.unbanTimeout({c: c, db: [guild.id, db]}), Math.round(c.$end! * 1000 - Date.now()));
        return (await CustomMethods.getDataFromDb<ICase>({db: db, command: "INSERT INTO UserCases(userID, moderatorID, reason, caseType, start, end) VALUES($userID, $moderatorID, $reason, $caseType, $start, $end) RETURNING caseID AS '$caseID'", params: c}) as Array<ICase>)[0].$caseID!;
    }

    private async unbanTimeout(ref:{c: ICase, db: [string, Sqlite3.Database]}) {
        const banGuild: Guild | undefined = await this._client.guilds.cache.get(ref.db[0]);
        if (banGuild != null)
            await banGuild.bans.remove(ref.c.$userID, `Case: ${ref.c.$caseID} - time expired.`);
    }

    public async getCases(guild: Guild, filter?: {order?: "asc" | "desc", user: User | null}): Promise<Array<ICase>> {
        return await CustomMethods.getDataFromDb<ICase>({
            db: this._client.guild_databases.get(guild.id)!,
            command: `SELECT caseID as '$caseID', reason as '$reason', userID as '$userID', moderatorID as '$moderatorID', caseType as '$caseType', start as '$start', end as '$end' FROM UserCases ${filter?.user != null ? "WHERE userID = $user" : ""} ORDER BY caseID ${filter?.order ?? "desc"}`,
            params: {$user: filter!.user?.id}});
    }

    public async isModerator(guild: Guild, user: User): Promise<boolean> {
        return (await CustomMethods.getDataFromDb({db: this._client.guild_databases.get(guild.id)!, command: `SELECT roleID FROM ServerModerators WHERE roleID = ${(await guild.members.fetch(user)).roles.cache.map(r => `'${r.id}'`).join(" or ")}`})).length > 0 ||
            (await guild.members.fetch(user)).roles.cache.some(r => r.permissions.has(PermissionFlags.Administrator));
    }

    public async addModerator(guild: Guild, role: Role): Promise<boolean> {
        return (await CustomMethods.getDataFromDb({db: this._client.guild_databases.get(guild.id)!, command: "INSERT OR IGNORE INTO ServerModerators(roleID) VALUES($id) RETURNING 1 AS 'r'", params: {$id: role.id}})).length > 0;
    }

    public async removeModerator(guild: Guild, role: Role): Promise<boolean> {
        return (await CustomMethods.getDataFromDb({db: this._client.guild_databases.get(guild.id)!, command: "DELETE FROM ServerModerators WHERE roleID = $id RETURNING 1 as 'r'", params: {$id: role.id}})).length > 0;
    }
}

export enum CaseTypes {
    BAN = 0,
    WARN = 1,
    MUTE = 2,
    KICK = 3
}

export interface ICase {
    $caseID?: number;
    $reason: string;
    $userID: string;
    $moderatorID: string;
    $caseType: CaseTypes;
    $start: number;
    $end?: number;
}