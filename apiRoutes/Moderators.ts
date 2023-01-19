import { BaseRoute, client } from "../exportMain.js";
import { Request, Response } from "express";
import { Guild, Role } from "discord.js";

export default class Moderators extends BaseRoute {
    path: string | RegExp = /\/moderators\/\d{18,19}(?:\/\d{18,19})?/;

    public override async get(req: Request, res: Response): Promise<void> {
        const params: [Guild?, Role?] = await Moderators.downloadUserAndGuild(req.originalUrl);
        if (params[0] != undefined) {
            const moderators: Array<string> = await client.mod_manager.getModerators(params[0]);
            if (params[1] != undefined) {
                res.json({role_id: params[1].id, role_name: params[1].name, is_moderator: moderators.includes(params[1].id)});
                return;
            }
            const resultArray: Array<{role_id: string, role_name: string}> = [];
            for (const moderator of moderators) {
                console.log((moderator as any).roleID)
                resultArray.push({role_id: (moderator as any).roleID, role_name: ((await params[0].roles.fetch((moderator as any).roleID))!.name)});
            }
            res.json(resultArray);
            return;
        }
        BaseRoute.badRequest(res, "The bot isn't on the guild or the guild does not exist.");
    }

    public override async put(req: Request, res: Response): Promise<void> {
        const params: [Guild?, Role?] = await Moderators.downloadUserAndGuild(req.originalUrl);
        if (params[0] == undefined) {
            BaseRoute.badRequest(res, "The bot isn't on the guild or the guild does not exist.");
            return;
        }

        if (params[1] == undefined) {
            BaseRoute.badRequest(res, "The role doesn't exist.");
            return;
        }

        await client.mod_manager.addModerator(params[0], params[1]);
        res.statusCode = 204;
        res.send("");
    }

    public override async delete(req: Request, res: Response): Promise<void> {
        const params: [Guild?, Role?] = await Moderators.downloadUserAndGuild(req.originalUrl);
        if (params[0] == undefined) {
            BaseRoute.badRequest(res, "The bot isn't on the guild or the guild does not exist.");
            return;
        }

        if (params[1] == undefined) {
            BaseRoute.badRequest(res, "The role doesn't exist.");
            return;
        }

        await client.mod_manager.removeModerator(params[0], params[1]);
        res.statusCode = 204;
        res.send("");
    }

    private static async downloadUserAndGuild(original: string): Promise<[Guild?, Role?]> {
        const args: Array<string> = original.substring(1).split(/[\/|\\]/gm);
        const guild: Guild | undefined = await client.guilds.fetch(args[1]);
        return [guild, guild != undefined && args[2] != undefined ? await guild?.roles.fetch(args[2]) ?? undefined : undefined];
    }
}