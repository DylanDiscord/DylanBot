import fs from 'node:fs';
import { CustomMethods } from "./handlers/CustomMethods.js";
import { CommandBase } from "./handlers/CommandBase.js";
import { client } from "./exportMain.js";
import { performance } from "node:perf_hooks";
(await import("dotenv")).config({path: "./config/.env"});
import config from "./config/config.json" assert {type: "json"};

performance.mark("start-loading");

for (const event of fs.readdirSync(config.paths.events).filter(e => e.endsWith(".ts"))) {
    client.on(event.substring(0, event.length - 3), async (...args: any) => (await import(`./${config.paths.events}/${event}`)).default(...args));
}

for (const commandIteration of CustomMethods.getFilesRecursively(config.paths.commands).filter(e => e.endsWith(".ts"))) {
    //noinspection JSPotentiallyInvalidConstructorUsage
    const command: CommandBase = new (await import(commandIteration.replace(/\.ts/gmi, ".js"))).default();
    client.commands.set(command.command.name, command);
}

await client.login(process.env.TOKEN);