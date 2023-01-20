import { BaseRoute, client } from "../exportMain.js";
import { Request, Response } from "express";
import { Guild, Role } from "discord.js";

export default class Moderators extends BaseRoute {
    path: string | RegExp = /\/moderators\/\d{18,19}\/\d{18,19}/;

    public override getPath: string | RegExp = /\/moderators\/\d{18,19}$/;
    public override async get(req: Request, res: Response): Promise<void> {
        const args: Array<string> = req.originalUrl.substring(1).split("/");
        const guild: Guild | null = await client.tryGetGuild(args[1]);

        if (guild == null) {
            BaseRoute.badRequest(res, "The guild doesn't exist.");
            return;
        }

        res.json(await client.mod_manager.getModerators(guild));
    }

    public override async put(req: Request, res: Response): Promise<void> {
        const [guild, role] = await Moderators.getGuildAndRole(req, res);

        if (guild == null || role == null) return;

        const result: boolean = await client.mod_manager.addModerator(guild, role);

        if (!result) {
            BaseRoute.badRequest(res, "The role already exists.");
            return;
        }

        res.status(204).send();
    }

    public override async delete(req: Request, res: Response): Promise<void> {
        const [guild, role] = await Moderators.getGuildAndRole(req, res);

        if (guild == null || role == null) return;

        const result: boolean = await client.mod_manager.removeModerator(guild, role);

        if (!result) {
            BaseRoute.badRequest(res, "The role already exists.");
            return;
        }

        res.status(204).send();
    }

    private static async getGuildAndRole(req: Request, res: Response): Promise<[guild: Guild | null, role: Role | null]> {
        const args: Array<string> = req.originalUrl.substring(1).split("/");
        const guild: Guild | null = await client.tryGetGuild(args[1]);

        if (guild == null) {
            BaseRoute.badRequest(res, "The guild doesn't exist.");
            return [null, null];
        }

        const role: Role | null = await client.tryGetRole(guild, args[2]);

        if (role == null) {
            BaseRoute.badRequest(res, "The role doesn't exist on this guild.");
            return [null, null];
        }

        return [guild, role];
    }
}