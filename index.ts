import fs from 'node:fs';
import { performance } from "node:perf_hooks";
(await import("dotenv")).config({path: "./config/.env"});
import { CustomMethods, CommandBase, Config, client, BaseRoute } from "./exportMain.js";
import {Request, Response} from "express";
import rateLimit, {RateLimitRequestHandler} from "express-rate-limit";

performance.mark("start-loading");

for (const event of fs.readdirSync(Config.paths.events).filter(e => e.endsWith(".ts"))) {
    client.on(event.substring(0, event.length - 3), async (...args: any) => (await import(`./${Config.paths.events}/${event}`)).default(...args));
}

for (const commandIteration of CustomMethods.getFilesRecursively(Config.paths.commands).filter(e => e.endsWith(".ts"))) {
    try {
        //noinspection JSPotentiallyInvalidConstructorUsage
        const command: CommandBase = new (await import(commandIteration.replace(/\.ts/gmi, ".js"))).default();
        client.commands.set(command.command.name, command);
    } catch {}
}

const rLimit: RateLimitRequestHandler = rateLimit({windowMs: 60000, max: 30, statusCode: 429, standardHeaders: true, legacyHeaders: false, message: {error: "Too many requests", message: "You have been rate-limited, the established use for this api is 30 requests per minute, to get more email at: dylanbot@memw.es"}});

for (const routeIteration of fs.readdirSync(Config.paths.apiRoutes).filter(e => e.endsWith(".ts"))) {
    try {
        //noinspection JSPotentiallyInvalidConstructorUsage
        const route: BaseRoute = new (await import(`${Config.paths.apiRoutes}/${routeIteration.replace(/\.ts/gmi, ".js")}`)).default();
        for (const name of Object.getOwnPropertyNames(BaseRoute.prototype)) {
            (client.api as any)[name](((route as any)[`${name}Path`] ?? route.path), rLimit, (route as any)[name]);
        }
    } catch {}
}

for (const name of Object.getOwnPropertyNames(BaseRoute.prototype))
    (client.api as any)[name]("*", rLimit, (req: Request, res: Response) => BaseRoute.notFound(res));

await client.login(process.env.TOKEN);