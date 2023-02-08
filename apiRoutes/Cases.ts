import {BaseRoute, client, ICase} from "../exportMain.js";
import {Request, Response} from "express";
import {Guild, User} from "discord.js";

export default class Cases extends BaseRoute {
    path: string | RegExp = /\/cases\/\d{18,19}(?:\/\d{18,19})?/i;

    public override async get(req: Request, res: Response): Promise<void> {
        const args: Array<string> = req.originalUrl.substring(1).split("/");

        const guild: Guild | null = await client.tryGetGuild(args[1]);

        if (guild == null) {
            BaseRoute.badRequest(res, "The guild doesn't exist, or the bot isn't on it.");
            return;
        }

        const targetUser: User | null = args.length <= 2 ? null : await client.tryGetUser(args[2]);

        if (targetUser == null && args.length > 2) {
            BaseRoute.badRequest(res, "The user doesn't exist or can't be fetched.");
            return;
        }

        const cases: Array<ICase> = await client.mod_manager.getCases(guild, {user: targetUser});

        res.status(200).send(cases);
    }
}