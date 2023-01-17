import { CustomClient, CustomMethods } from "../exportMain.js";
import { Guild } from "discord.js";

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
                setTimeout(async () => {
                    const banGuild: Guild | undefined = await this._client.guilds.cache.get(db[0]);
                    if (banGuild != null)
                        await banGuild.bans.remove(c.$userID, `Case: ${c.$caseID} - time expired.`);
                }, c.$end! * 1000 - Date.now());
            }
        }
    }

    public async addCase(guild: string, c: ICase): Promise<number> {
        return (await CustomMethods.getDataFromDb<ICase>({db: this._client.guild_databases.get(guild)!, command: "INSERT INTO UserCases(userID, moderatorID, reason, caseType, start, end) VALUES($userID, $moderatorID, $reason, $caseType, $start, $end) RETURNING caseID", params: c}) as Array<any>)[0].caseID!;
    }

    public async getCases(guild: string, filter?: {order?: "asc" | "desc", user?: string}): Promise<Array<ICase>> {
        return await CustomMethods.getDataFromDb<ICase>({
            db: this._client.guild_databases.get(guild)!,
            command: `SELECT caseID, reason, userID, moderatorID, caseType, start, end FROM UserCases ${filter?.user != null ? "WHERE userID = $user" : ""} ORDER BY @order`,
            params: {$order: filter?.order ?? "asc", $user: filter!.user}});
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